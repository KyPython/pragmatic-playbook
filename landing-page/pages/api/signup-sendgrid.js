// Alternative signup API route with SendGrid integration
// Use this if you want to send transactional emails via SendGrid
// while still using HubSpot for contact management

import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, firstName, lastName } = req.body;

  // Validation
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  }

  // Initialize SendGrid
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@foundersinfra.com';
  const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Founders Infrastructure';

  if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
  }

  // HubSpot API integration (still save contact)
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  const HUBSPOT_API_URL = 'https://api.hubapi.com/contacts/v1/contact';

  // Get source information
  const referer = req.headers.referer || '';
  const origin = req.headers.origin || '';
  const sourceUrl = referer || origin || 'direct';
  
  let leadSource = 'Landing Page';
  let marketingSource = 'foundersinfra.com';
  
  if (sourceUrl.includes('foundersinfra.com')) {
    leadSource = 'Landing Page';
    marketingSource = 'foundersinfra.com';
  } else if (sourceUrl.includes('vercel.app')) {
    leadSource = 'Landing Page (Vercel)';
    marketingSource = 'foundersinfra.com';
  }

  try {
    // 1. Save contact to HubSpot (for CRM/sequences)
    let contactId = null;
    if (HUBSPOT_API_KEY) {
      const properties = [
        { property: 'email', value: email },
        ...(firstName ? [{ property: 'firstname', value: firstName }] : []),
        ...(lastName ? [{ property: 'lastname', value: lastName }] : []),
        { property: 'lifecyclestage', value: 'subscriber' },
        { property: 'hs_analytics_source', value: 'LANDING_PAGE' },
        { property: 'hs_analytics_source_data_1', value: 'foundersinfra.com' },
        { property: 'signup_source', value: 'Landing Page - Email Signup Form' },
        { property: 'signup_url', value: sourceUrl },
        { property: 'signup_date', value: new Date().toISOString() },
        { property: 'marketing_source', value: marketingSource },
        { property: 'lead_source', value: leadSource },
      ];

      const response = await fetch(HUBSPOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({ properties }),
      });

      if (response.ok) {
        const data = await response.json();
        contactId = data.vid || data.id;
      } else if (response.status === 409) {
        // Contact exists, update it
        const emailParam = encodeURIComponent(email);
        const updateResponse = await fetch(
          `${HUBSPOT_API_URL}/createOrUpdate/email/${emailParam}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            },
            body: JSON.stringify({ properties }),
          }
        );
        if (updateResponse.ok) {
          const updateData = await updateResponse.json();
          contactId = updateData.vid || updateData.id;
        }
      }

      // Enroll in workflow if configured
      const HUBSPOT_WORKFLOW_ID = process.env.HUBSPOT_WORKFLOW_ID;
      if (HUBSPOT_WORKFLOW_ID && contactId) {
        try {
          await fetch(
            `https://api.hubapi.com/automation/v3/workflows/${HUBSPOT_WORKFLOW_ID}/enrollments/contacts/${contactId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
              },
            }
          );
        } catch (workflowError) {
          console.warn('Workflow enrollment error:', workflowError);
        }
      }
    }

    // 2. Send welcome email via SendGrid (transactional)
    if (SENDGRID_API_KEY) {
      const welcomeEmail = {
        to: email,
        from: {
          email: SENDGRID_FROM_EMAIL,
          name: SENDGRID_FROM_NAME,
        },
        subject: 'Welcome to The Founder\'s Infrastructure Playbook',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8f9fa;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 20px; text-align: center;">
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <tr>
                      <td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to The Founder's Infrastructure Playbook</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                        <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Welcome! You've taken the first step toward building production-grade infrastructure.</p>
                        <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Over the next 8 weeks, you'll learn:</p>
                        <ul style="margin: 0 0 20px 0; padding-left: 25px; color: #333; font-size: 16px; line-height: 1.8;">
                          <li style="margin-bottom: 10px;">How to detect technical debt before it costs $50k</li>
                          <li style="margin-bottom: 10px;">How to build MVPs in 2 weeks instead of 3 months</li>
                          <li style="margin-bottom: 10px;">How to deploy on Friday 5 PM with confidence</li>
                        </ul>
                        <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">Questions? Just reply to this email.</p>
                        <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Let's build something great,<br><strong>${SENDGRID_FROM_NAME}</strong></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">The Founder's Infrastructure Playbook</p>
                        <p style="margin: 0; color: #666; font-size: 14px;">
                          <a href="https://foundersinfra.com" style="color: #3b82f6; text-decoration: none;">foundersinfra.com</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        text: `
Hi ${firstName || 'there'},

Welcome! You've taken the first step toward building production-grade infrastructure.

Over the next 8 weeks, you'll learn:
- How to detect technical debt before it costs $50k
- How to build MVPs in 2 weeks instead of 3 months
- How to deploy on Friday 5 PM with confidence

Questions? Just reply to this email.

Let's build something great,
${SENDGRID_FROM_NAME}

---
The Founder's Infrastructure Playbook
foundersinfra.com
        `,
      };

      try {
        await sgMail.send(welcomeEmail);
        console.log(`Welcome email sent via SendGrid to ${email}`);
      } catch (sendGridError) {
        console.error('SendGrid error:', sendGridError);
        // Don't fail signup if email fails
      }
    }

    return res.json({
      success: true,
      message: 'Successfully added to mailing list',
      contactId: contactId,
      source: leadSource,
      emailSent: !!SENDGRID_API_KEY,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process signup',
    });
  }
}

