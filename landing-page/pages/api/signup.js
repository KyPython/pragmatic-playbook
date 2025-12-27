// API route for email signup
// HubSpot: Contact management (CRM) only
// SendGrid: All email sending (transactional + sequences)

// Helper function to format error messages based on environment
function formatErrorMessage(error, isDevelopment = false) {
  const isDev = isDevelopment || process.env.NODE_ENV === 'development';
  
  // In production, return user-friendly messages
  // In development, return technical details
  if (!isDev) {
    // Map technical errors to user-friendly messages
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes('Property values were not valid')) {
      return 'There was an issue saving your information. Please try again or contact us directly.';
    }
    
    if (errorMessage.includes('Failed to add contact to HubSpot')) {
      return 'We received your signup, but had trouble saving it. Please try again.';
    }
    
    if (errorMessage.includes('Invalid email format')) {
      return 'Please enter a valid email address.';
    }
    
    if (errorMessage.includes('Email is required')) {
      return 'Please enter your email address.';
    }
    
    // Generic user-friendly message for unknown errors
    return 'Something went wrong. Please try again or contact us if the problem persists.';
  }
  
  // In development, return full technical details
  return error.message || error.toString();
}

export default async function handler(req, res) {
  // Dynamic import for SendGrid (only if needed)
  let sgMail = null;
  if (process.env.SENDGRID_API_KEY) {
    sgMail = (await import('@sendgrid/mail')).default;
  }
  
  // Dynamic import for email sequences (only if needed)
  let emailSequences = null;
  if (process.env.HUBSPOT_API_KEY) {
    try {
      emailSequences = require('./services/email-sequences');
    } catch (e) {
      console.warn('Email sequences service not available:', e.message);
    }
  }
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: formatErrorMessage(new Error('Method not allowed'), isDevelopment)
    });
  }

  const { email, firstName, lastName } = req.body;
  
  // Get source information
  const referer = req.headers.referer || '';
  const origin = req.headers.origin || '';
  const sourceUrl = referer || origin || 'direct';
  
  // Determine source
  let leadSource = 'Landing Page';
  let marketingSource = 'foundersinfra.com';
  
  if (sourceUrl.includes('foundersinfra.com')) {
    leadSource = 'Landing Page';
    marketingSource = 'foundersinfra.com';
  } else if (sourceUrl.includes('vercel.app')) {
    leadSource = 'Landing Page (Vercel)';
    marketingSource = 'foundersinfra.com';
  } else if (sourceUrl !== 'direct') {
    leadSource = 'Landing Page (External)';
    marketingSource = sourceUrl;
  }

  // Validation
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      error: formatErrorMessage(new Error('Email is required'), isDevelopment)
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: formatErrorMessage(new Error('Invalid email format'), isDevelopment)
    });
  }

  // HubSpot API integration
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  // Using v1 API (still supported and simpler for this use case)
  const HUBSPOT_API_URL = 'https://api.hubapi.com/contacts/v1/contact';

  if (!HUBSPOT_API_KEY) {
    // If HubSpot not configured, just return success (for testing)
    console.warn('HubSpot API key not configured');
    return res.json({
      success: true,
      message: 'Signup received (HubSpot not configured)',
    });
  }

  try {
    // Build properties array for v1 API (format: [{property: 'name', value: 'value'}])
    // Only include standard HubSpot properties that always exist
    // Custom properties (signup_source, etc.) should be created in HubSpot first
    const properties = [
      { property: 'email', value: email },
      ...(firstName ? [{ property: 'firstname', value: firstName }] : []),
      ...(lastName ? [{ property: 'lastname', value: lastName }] : []),
      { property: 'lifecyclestage', value: 'subscriber' },
      // Standard HubSpot properties (always exist)
      { property: 'hs_analytics_source', value: 'LANDING_PAGE' },
      { property: 'hs_analytics_source_data_1', value: 'foundersinfra.com' },
      { property: 'hs_analytics_source_data_2', value: 'Email Signup Form' },
      { property: 'hs_lead_status', value: 'NEW' },
    ];
    
    // Note: Custom properties (signup_source, signup_url, etc.) should be created in HubSpot first
    // See EMAIL-SEQUENCE-SETUP.md for instructions on creating custom properties

    // Try to create contact using v1 API
    const response = await fetch(HUBSPOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: properties,
      }),
    });

    if (response.status === 409) {
      // Contact already exists, use createOrUpdate endpoint
      const emailParam = encodeURIComponent(email);
      const updateResponse = await fetch(
        `${HUBSPOT_API_URL}/createOrUpdate/email/${emailParam}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            properties: [
              { property: 'lifecyclestage', value: 'subscriber' },
              // Update source tracking even for existing contacts (standard properties only)
              { property: 'hs_analytics_source', value: 'LANDING_PAGE' },
              { property: 'hs_analytics_source_data_1', value: 'foundersinfra.com' },
              { property: 'hs_analytics_source_data_2', value: 'Email Signup Form' },
            ],
          }),
        }
      );

      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        const contactId = updateData.vid || updateData.id;

        // Note: HubSpot is used for contact management only
        // Email sequences are handled by SendGrid

        return res.json({
          success: true,
          message: 'Email already registered, updated subscription status and source tracking',
          hubspotSaved: true,
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || errorData.errors?.[0]?.message || 'Failed to add contact to HubSpot';
      
      // Log full error details for debugging (always log technical details)
      console.error('HubSpot API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        message: errorMessage
      });
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const contactId = data.vid || data.id;
    
    // Note: HubSpot is used for contact management only
    // Email sequences are handled by SendGrid (see below)

    // Optional: Send welcome email via SendGrid (if configured)
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'founders@foundersinfra.com';
    const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Founders Infrastructure';
    
    if (SENDGRID_API_KEY && sgMail) {
      try {
        sgMail.setApiKey(SENDGRID_API_KEY);
        await sgMail.send({
          to: email,
          from: {
            email: SENDGRID_FROM_EMAIL,
            name: SENDGRID_FROM_NAME,
          },
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
                      <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">Let's build something great,<br><strong>${SENDGRID_FROM_NAME}</strong></p>
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
          text: `Hi ${firstName || 'there'},\n\nWelcome! You've taken the first step toward building production-grade infrastructure.\n\nOver the next 8 weeks, you'll learn:\n- How to detect technical debt before it costs $50k\n- How to build MVPs in 2 weeks instead of 3 months\n- How to deploy on Friday 5 PM with confidence\n\nQuestions? Just reply to this email.\n\nLet's build something great,\n${SENDGRID_FROM_NAME}\n\n---\nThe Founder's Infrastructure Playbook\nfoundersinfra.com`,
        });
        console.log(`Welcome email sent via SendGrid to ${email}`);
        emailSent = true;
      } catch (sendGridError) {
        console.error('SendGrid error:', sendGridError);
        // Don't fail signup if email fails
      }
    }

    // Schedule email sequence using SendGrid (if configured)
    let sequenceScheduled = false;
    if (emailSent && emailSequences && HUBSPOT_API_KEY) {
      try {
        const result = await emailSequences.scheduleSequence(
          email,
          firstName || '',
          'foundersinfra-welcome'
        );
        
        if (result.success) {
          console.log(`Email sequence scheduled for ${email}: ${result.scheduledCount} emails`);
          sequenceScheduled = true;
        } else {
          console.error('Failed to schedule email sequence:', result.error);
        }
      } catch (sequenceError) {
        console.error('Email sequence scheduling error:', sequenceError);
        // Don't fail signup if sequence scheduling fails
      }
    }

    return res.json({
      success: true,
      message: 'Successfully added to mailing list',
      contactId: contactId,
      source: leadSource,
      emailSent: emailSent,
      hubspotSaved: !!HUBSPOT_API_KEY,
      sequenceScheduled: sequenceScheduled,
    });
  } catch (error) {
    // Always log full error details for debugging
    console.error('Signup API Error:', {
      message: error.message,
      stack: isDevelopment ? error.stack : undefined,
      error: error
    });
    
    // Return user-friendly message in production, technical in development
    const userMessage = formatErrorMessage(error, isDevelopment);
    
    return res.status(500).json({
      success: false,
      error: userMessage,
      // Include technical details in development mode only
      ...(isDevelopment && { 
        technicalDetails: {
          message: error.message,
          stack: error.stack
        }
      })
    });
  }
}

