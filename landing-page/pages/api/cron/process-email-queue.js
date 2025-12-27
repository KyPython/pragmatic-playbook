// Cron job to process scheduled email sequences
// Runs hourly via Vercel cron
// Sends due emails via SendGrid

const { getEmailTemplate, sendEmailViaSendGrid } = require('../services/email-sequences');

export default async function handler(req, res) {
  // Verify this is a cron request (Vercel adds a header)
  const CRON_SECRET = process.env.CRON_SECRET;
  if (CRON_SECRET && req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  
  if (!HUBSPOT_API_KEY || !SENDGRID_API_KEY) {
    console.warn('HubSpot or SendGrid API key not configured, skipping email queue processing.');
    return res.status(200).json({ success: true, message: 'API keys not configured.' });
  }

  try {
    console.log('Processing email queue...');

    // Fetch all contacts with scheduled emails
    const contactsResponse = await fetch(
      `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?property=email&property=firstname&property=lastname&property=scheduled_emails`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!contactsResponse.ok) {
      const errorData = await contactsResponse.json();
      throw new Error(`Failed to fetch contacts: ${errorData.message}`);
    }

    const { contacts } = await contactsResponse.json();
    let emailsSent = 0;
    let emailsSkipped = 0;
    let emailsFailed = 0;

    for (const contact of contacts) {
      const email = contact.properties.email?.value;
      const firstName = contact.properties.firstname?.value;
      let scheduledEmails = [];

      try {
        if (contact.properties.scheduled_emails?.value) {
          scheduledEmails = JSON.parse(contact.properties.scheduled_emails.value);
        }
      } catch (parseError) {
        console.error(`Error parsing scheduled_emails for contact ${email}:`, parseError);
        continue;
      }

      if (!scheduledEmails || scheduledEmails.length === 0) {
        continue; // Skip contacts without scheduled emails
      }

      const now = new Date();
      const updatedScheduledEmails = [];

      for (const scheduledEmail of scheduledEmails) {
        if (!scheduledEmail.sent && new Date(scheduledEmail.scheduledFor) <= now) {
          try {
            // Get email template
            const template = getEmailTemplate(scheduledEmail.template, firstName || '');
            
            // Send email via SendGrid
            const result = await sendEmailViaSendGrid(email, template.subject, template.html);
            
            if (result.success) {
              scheduledEmail.sent = true;
              emailsSent++;
              console.log(`Sent scheduled email to ${email}: ${scheduledEmail.subject}`);
            } else {
              console.error(`Failed to send email to ${email}: ${result.error}`);
              emailsFailed++;
            }
          } catch (sendError) {
            console.error(`Error sending email to ${email}:`, sendError);
            emailsFailed++;
          }
        } else if (scheduledEmail.sent) {
          emailsSkipped++;
        }
        updatedScheduledEmails.push(scheduledEmail);
      }

      // Update HubSpot contact with new scheduled_emails status
      if (updatedScheduledEmails.length > 0) {
        try {
          const updateResponse = await fetch(
            `https://api.hubapi.com/contacts/v1/contact/vid/${contact.vid}/profile`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                properties: [
                  {
                    property: 'scheduled_emails',
                    value: JSON.stringify(updatedScheduledEmails),
                  },
                ],
              }),
            }
          );

          if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            console.error(`Failed to update scheduled_emails for contact ${email}: ${errorData.message}`);
          }
        } catch (updateError) {
          console.error(`Error updating scheduled_emails for contact ${email}:`, updateError);
        }
      }
    }

    console.log(`Email queue processing complete. Sent: ${emailsSent}, Skipped: ${emailsSkipped}, Failed: ${emailsFailed}`);
    res.status(200).json({
      success: true,
      message: `Email queue processed. Sent: ${emailsSent}, Skipped: ${emailsSkipped}, Failed: ${emailsFailed}`,
      emailsSent,
      emailsSkipped,
      emailsFailed,
    });
  } catch (error) {
    console.error('Error processing email queue:', error);
    res.status(500).json({ error: error.message || 'Failed to process email queue' });
  }
}

