// Automated email sequence service using SendGrid
// Schedules emails and processes them via cron job

const sgMail = require('@sendgrid/mail');

// Email sequence templates
const sequences = {
  'foundersinfra-welcome': [
    {
      delayDays: 0, // Immediate welcome email
      subject: 'Welcome to The Founder\'s Infrastructure Playbook',
      template: 'welcome',
    },
    {
      delayDays: 2, // 2 days after signup
      subject: 'The $50K Technical Debt Problem',
      template: 'pain-point',
    },
    {
      delayDays: 5, // 5 days after signup
      subject: 'How to Recover Lost Velocity',
      template: 'roi',
    },
    {
      delayDays: 9, // 9 days after signup
      subject: 'Real Results from Infrastructure Consulting',
      template: 'social-proof',
    },
    {
      delayDays: 13, // 13 days after signup
      subject: 'Ready to Recover $50K+ in Lost Velocity?',
      template: 'final-push',
    },
    {
      delayDays: 20, // 20 days after signup
      subject: 'Following up on infrastructure consulting',
      template: 'follow-up',
    },
  ],
};

// Email templates
const templates = {
  welcome: (firstName) => ({
    subject: 'Welcome to The Founder\'s Infrastructure Playbook',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to The Founder's Infrastructure Playbook</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Welcome! You've taken the first step toward building production-grade infrastructure.</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Over the next 8 weeks, you'll learn:</p>
                <ul style="margin: 0 0 20px 0; padding-left: 25px; color: #333; font-size: 16px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">How to detect technical debt before it costs $50k</li>
                  <li style="margin-bottom: 10px;">How to build MVPs in 2 weeks instead of 3 months</li>
                  <li style="margin-bottom: 10px;">How to deploy on Friday 5 PM with confidence</li>
                </ul>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">Questions? Just reply to this email.</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Let's build something great,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
              <tr><td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">The Founder's Infrastructure Playbook</p>
                <p style="margin: 0; color: #666; font-size: 14px;"><a href="https://foundersinfra.com" style="color: #3b82f6; text-decoration: none;">foundersinfra.com</a></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
  'pain-point': (firstName) => ({
    subject: 'The $50K Technical Debt Problem',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">The $50K Technical Debt Problem</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">I see this all the time: Your team used to ship 1 feature per week. Now it takes 3 weeks.</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;"><strong>The Math:</strong> Every $1 of technical debt costs $3–5 in future development time.</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">If you've shipped for 6+ months, you're probably losing <strong>$5K–$20K per month</strong> to technical debt.</p>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">I help teams identify and recover this lost velocity. Want to discuss?</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Best,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
  'roi': (firstName) => ({
    subject: 'How to Recover Lost Velocity',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">How to Recover Lost Velocity</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Here's how I help teams recover lost velocity:</p>
                <ul style="margin: 0 0 20px 0; padding-left: 25px; color: #333; font-size: 16px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">Find hidden costs (technical debt inventory)</li>
                  <li style="margin-bottom: 10px;">Prioritize what matters (20% causing 80% of problems)</li>
                  <li style="margin-bottom: 10px;">Build confidence (CI/CD, testing, monitoring)</li>
                </ul>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">Ready to discuss? <a href="https://calendly.com/kyjahn-smith/consultation" style="color: #3b82f6;">Book a free 15-minute call</a>.</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Best,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
  'social-proof': (firstName) => ({
    subject: 'Real Results from Infrastructure Consulting',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Real Results</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">I focus on practical, actionable improvements:</p>
                <ul style="margin: 0 0 20px 0; padding-left: 25px; color: #333; font-size: 16px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;"><strong>Find Hidden Costs:</strong> Identify technical debt costing you velocity</li>
                  <li style="margin-bottom: 10px;"><strong>Prioritize What Matters:</strong> Focus on 20% causing 80% of problems</li>
                  <li style="margin-bottom: 10px;"><strong>Build Confidence:</strong> Set up CI/CD, testing, and monitoring</li>
                </ul>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">Want to see how this applies to your team? <a href="https://calendly.com/kyjahn-smith/consultation" style="color: #3b82f6;">Let's talk</a>.</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Best,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
  'final-push': (firstName) => ({
    subject: 'Ready to Recover $50K+ in Lost Velocity?',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Ready to Recover Lost Velocity?</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Your team is losing $5K–$20K per month to technical debt. I can help you recover it.</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;"><strong>My services:</strong></p>
                <ul style="margin: 0 0 20px 0; padding-left: 25px; color: #333; font-size: 16px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">Technical Audit ($1,500) - Find $50K+ in hidden costs</li>
                  <li style="margin-bottom: 10px;">Architecture Review ($2,500) - Deep analysis + roadmap</li>
                  <li style="margin-bottom: 10px;">CI/CD Implementation ($3,000) - Deploy in 8 minutes</li>
                </ul>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;"><a href="https://calendly.com/kyjahn-smith/consultation" style="color: #3b82f6; font-weight: 600;">Book a free 15-minute call</a> to discuss.</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Best,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
  'follow-up': (firstName) => ({
    subject: 'Following up on infrastructure consulting',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr><td style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Still Interested?</h1>
              </td></tr>
              <tr><td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Hi ${firstName || 'there'},</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">Just following up. I know you're busy.</p>
                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">If you're still interested in recovering lost velocity, I'm here to help. No pressure - just reply if you want to chat.</p>
                <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">Questions? Just reply to this email.</p>
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Best,<br><strong>Founders Infrastructure</strong></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  }),
};

/**
 * Schedule email sequence for a contact
 * Stores scheduled emails in HubSpot custom property for processing by cron job
 */
async function scheduleSequence(email, firstName, sequenceName = 'foundersinfra-welcome') {
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  if (!HUBSPOT_API_KEY) {
    console.warn('HubSpot API key not configured, cannot schedule email sequence');
    return { success: false, error: 'HubSpot not configured' };
  }

  const sequence = sequences[sequenceName];
  if (!sequence) {
    return { success: false, error: `Sequence ${sequenceName} not found` };
  }

  const scheduledEmails = [];
  const signupDate = new Date();

  // Schedule each email in the sequence
  for (const emailConfig of sequence) {
    const scheduledDate = new Date(signupDate);
    scheduledDate.setDate(scheduledDate.getDate() + emailConfig.delayDays);

    scheduledEmails.push({
      subject: emailConfig.subject,
      template: emailConfig.template,
      scheduledFor: scheduledDate.toISOString(),
      sent: false,
    });
  }

  // Store scheduled emails in HubSpot custom property
  try {
    const emailParam = encodeURIComponent(email);
    
    // Try different date formats - HubSpot date picker might need Unix timestamp in milliseconds
    // Format 1: Milliseconds timestamp (most common for HubSpot)
    const dateValueMs = signupDate.getTime();
    // Format 2: ISO string (fallback)
    const dateValueISO = signupDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Try setting properties one at a time to isolate which one fails
    const propertiesToSet = [
      {
        property: 'scheduled_emails',
        value: JSON.stringify(scheduledEmails),
      },
      {
        property: 'email_sequence',
        value: sequenceName,
      },
      {
        property: 'sequence_start_date',
        value: dateValueMs, // Try milliseconds first
      },
    ];
    
    const response = await fetch(
      `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${emailParam}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: propertiesToSet,
        }),
      }
    );

    if (response.ok) {
      console.log(`Email sequence scheduled for ${email}: ${scheduledEmails.length} emails`);
      return { success: true, scheduledCount: scheduledEmails.length };
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to schedule email sequence';
      
      // Extract which specific property failed
      let failedProperty = null;
      if (errorData.errors && Array.isArray(errorData.errors)) {
        errorData.errors.forEach(err => {
          if (err.category === 'VALIDATION_ERROR' && err.errors && Array.isArray(err.errors)) {
            err.errors.forEach(subErr => {
              if (subErr.errorType === 'PROPERTY_NOT_FOUND' || 
                  subErr.errorType === 'INVALID_PROPERTY' ||
                  subErr.errorType === 'INVALID_VALUE') {
                failedProperty = subErr.name || subErr.property || 'unknown';
                console.error(`❌ FAILED PROPERTY: "${failedProperty}"`);
                console.error(`   Error Type: ${subErr.errorType}`);
                console.error(`   Message: ${subErr.message || 'No message'}`);
              }
            });
          }
        });
      }
      
      // Log full error details for debugging
      console.error('HubSpot API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        message: errorMessage,
        failedProperty: failedProperty,
        propertiesAttempted: propertiesToSet.map(p => p.property),
        dateValueUsed: dateValueMs,
        dateValueISO: dateValueISO
      });
      
      // If date property failed, try ISO format
      if (failedProperty === 'sequence_start_date') {
        console.log('⚠️  Date property failed with milliseconds, trying ISO format...');
        const retryProperties = [
          ...propertiesToSet.filter(p => p.property !== 'sequence_start_date'),
          {
            property: 'sequence_start_date',
            value: dateValueISO, // Try ISO format
          },
        ];
        
        const retryResponse = await fetch(
          `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${emailParam}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            },
            body: JSON.stringify({
              properties: retryProperties,
            }),
          }
        );
        
        if (retryResponse.ok) {
          console.log(`✅ Email sequence scheduled (using ISO date format): ${scheduledEmails.length} emails`);
          return { success: true, scheduledCount: scheduledEmails.length };
        } else {
          const retryErrorData = await retryResponse.json();
          console.error('❌ Retry with ISO format also failed:', retryErrorData);
        }
      }
      
      // If custom properties don't exist, log warning but don't fail
      if (errorMessage.includes('Property values were not valid') || 
          errorMessage.includes('property') && errorMessage.includes('not found') ||
          errorMessage.toLowerCase().includes('invalid property') ||
          errorMessage.includes('does not exist')) {
        console.warn(`HubSpot custom properties issue detected. Error: ${errorMessage}`);
        if (failedProperty) {
          console.warn(`❌ SPECIFIC FAILED PROPERTY: "${failedProperty}"`);
        }
        console.warn('Please verify these properties exist in HubSpot with EXACT names:');
        console.warn('  - scheduled_emails (Single-line text)');
        console.warn('  - email_sequence (Single-line text)');
        console.warn('  - sequence_start_date (Date picker)');
        console.warn('Go to HubSpot → Settings → Properties → Contacts to verify.');
        return { 
          success: false, 
          error: `Custom property "${failedProperty || 'unknown'}" not found or misconfigured. Please verify property names match exactly in HubSpot.`,
          warning: true,
          details: errorMessage,
          failedProperty: failedProperty
        };
      }
      
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Failed to schedule email sequence:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get email template
 */
function getEmailTemplate(templateName, firstName) {
  const template = templates[templateName];
  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }
  return template(firstName || 'there');
}

/**
 * Send email via SendGrid
 */
async function sendEmailViaSendGrid(email, subject, html) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'founders@foundersinfra.com';
  const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Founders Infrastructure';

  if (!SENDGRID_API_KEY) {
    return { success: false, error: 'SendGrid API key not configured' };
  }

  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const result = await sgMail.send({
      to: email,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME,
      },
      subject,
      html,
      text: html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log(`Email sent via SendGrid: ${subject} to ${email}`);
    return { success: true, messageId: result[0]?.headers['x-message-id'] };
  } catch (error) {
    console.error('SendGrid send error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  scheduleSequence,
  getEmailTemplate,
  sendEmailViaSendGrid,
  sequences,
  templates,
};

