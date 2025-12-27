// Cron job to process scheduled email queue
// Runs hourly via Vercel cron jobs
// Sends emails that are due using SendGrid

let emailSequences = null;
try {
  emailSequences = require('../services/email-sequences');
} catch (e) {
  console.warn('Email sequences service not available:', e.message);
}

export default async function handler(req, res) {
  // Verify cron secret (Vercel adds Authorization header)
  const authHeader = req.headers.authorization;
  const CRON_SECRET = process.env.CRON_SECRET;
  
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  if (!HUBSPOT_API_KEY) {
    return res.status(500).json({ error: 'HubSpot API key not configured' });
  }

  try {
    console.log('Processing email queue...');

    // Get all contacts with scheduled emails from HubSpot
    // Query contacts where scheduled_emails property exists
    const response = await fetch(
      'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?property=scheduled_emails&property=email&property=firstname',
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch contacts from HubSpot');
    }

    const data = await response.json();
    const contacts = data.contacts || [];

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    const now = new Date();

    for (const contact of contacts) {
      try {
        const email = contact.properties?.email?.value;
        const firstName = contact.properties?.firstname?.value || '';
        const scheduledEmailsJson = contact.properties?.scheduled_emails?.value;

        if (!email || !scheduledEmailsJson) {
          continue;
        }

        let scheduledEmails;
        try {
          scheduledEmails = JSON.parse(scheduledEmailsJson);
        } catch (e) {
          console.error(`Failed to parse scheduled emails for ${email}:`, e);
          continue;
        }

        // Find emails that are due (scheduledFor <= now)
        const dueEmails = scheduledEmails.filter(
          (email) => new Date(email.scheduledFor) <= now && !email.sent
        );

        if (dueEmails.length === 0) {
          continue;
        }

        // Send each due email
        for (const emailConfig of dueEmails) {
          try {
            if (!emailSequences) {
              console.error('Email sequences service not available');
              continue;
            }
            
            const template = emailSequences.getEmailTemplate(emailConfig.template, firstName);
            
            const result = await emailSequences.sendEmailViaSendGrid(
              email,
              emailConfig.subject,
              template.html,
              firstName
            );

            if (result.success) {
              // Mark as sent
              emailConfig.sent = true;
              emailConfig.sentAt = new Date().toISOString();
              sent++;
              console.log(`Sent email: ${emailConfig.subject} to ${email}`);
            } else {
              failed++;
              console.error(`Failed to send email to ${email}:`, result.error);
            }
          } catch (error) {
            failed++;
            console.error(`Error sending email to ${email}:`, error);
          }
        }

        // Update HubSpot with sent status
        if (dueEmails.some((e) => e.sent)) {
          const emailParam = encodeURIComponent(email);
          await fetch(
            `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${emailParam}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
              },
              body: JSON.stringify({
                properties: [
                  {
                    property: 'scheduled_emails',
                    value: JSON.stringify(scheduledEmails),
                  },
                ],
              }),
            }
          );
        }
      } catch (error) {
        console.error(`Error processing contact:`, error);
        failed++;
      }
    }

    const total = sent + failed + skipped;
    console.log(`Email queue processed: ${sent} sent, ${failed} failed, ${skipped} skipped`);

    return res.json({
      success: true,
      message: `Processed: ${sent} sent, ${failed} failed, ${skipped} skipped`,
      sent,
      failed,
      skipped,
      total,
    });
  } catch (error) {
    console.error('Email queue processing error:', error);
    return res.status(500).json({
      error: 'Failed to process email queue',
      message: error.message,
    });
  }
}

