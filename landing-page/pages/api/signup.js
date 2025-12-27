// API route for email signup
// HubSpot: Contact management (CRM) only
// SendGrid: All email sending (transactional + sequences)

// Helper to check if we're in development
const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to mask sensitive data in production
function maskSensitiveData(data) {
  if (isDevelopment) {
    return data; // Return full data in development
  }
  
  // In production, mask sensitive information
  if (typeof data === 'string') {
    // Mask email addresses
    return data.replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, (email) => {
      const [local, domain] = email.split('@');
      return `${local.substring(0, 2)}***@${domain}`;
    });
  }
  
  if (typeof data === 'object' && data !== null) {
    const masked = { ...data };
    
    // Mask sensitive fields
    const sensitiveFields = ['email', 'apiKey', 'api_key', 'token', 'password', 'contactId', 'contact_id', 'vid'];
    for (const field of sensitiveFields) {
      if (masked[field]) {
        if (typeof masked[field] === 'string' && masked[field].length > 4) {
          masked[field] = `${masked[field].substring(0, 2)}***${masked[field].substring(masked[field].length - 2)}`;
        } else {
          masked[field] = '***';
        }
      }
    }
    
    // Mask nested objects
    for (const key in masked) {
      if (typeof masked[key] === 'object' && masked[key] !== null) {
        masked[key] = maskSensitiveData(masked[key]);
      }
    }
    
    return masked;
  }
  
  return data;
}

// Environment-aware logging helper
const safeLog = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    } else {
      // In production, log minimal info
      const masked = args.map(arg => maskSensitiveData(arg));
      console.log(...masked);
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, log errors but mask sensitive data
      const masked = args.map(arg => maskSensitiveData(arg));
      console.error(...masked);
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    } else {
      const masked = args.map(arg => maskSensitiveData(arg));
      console.warn(...masked);
    }
  }
};

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
      safeLog.warn('Email sequences service not available:', e.message);
    }
  }
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
    // If HubSpot not configured, log warning but still try to send email
    safeLog.warn('HubSpot API key not configured - contacts will not be saved to HubSpot');
    
    // Still try to send welcome email if SendGrid is configured
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    if (SENDGRID_API_KEY && sgMail) {
      try {
        sgMail.setApiKey(SENDGRID_API_KEY);
        const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'founders@foundersinfra.com';
        const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Founders Infrastructure';
        
        await sgMail.send({
          to: email,
          from: { email: SENDGRID_FROM_EMAIL, name: SENDGRID_FROM_NAME },
          subject: 'Welcome to The Founder\'s Infrastructure Playbook',
          html: `Hi ${firstName || 'there'},<br><br>Welcome! You've been added to our mailing list.<br><br>Best,<br>${SENDGRID_FROM_NAME}`,
        });
      } catch (emailError) {
        safeLog.error('SendGrid error (HubSpot not configured):', emailError);
      }
    }
    
    return res.json({
      success: true,
      message: 'Signup received (HubSpot not configured - email sent if SendGrid available)',
      hubspotSaved: false,
    });
  }

  // Initialize variables for HubSpot contact tracking
  let contactId = null;
  let hubspotSaved = false;

  try {
    // Build properties array for v1 API (format: [{property: 'name', value: 'value'}])
    // Use ONLY core properties that always exist in every HubSpot account
    // This prevents "Property values were not valid" errors
    const properties = [
      { property: 'email', value: email },
      ...(firstName ? [{ property: 'firstname', value: firstName }] : []),
      ...(lastName ? [{ property: 'lastname', value: lastName }] : []),
      { property: 'lifecyclestage', value: 'subscriber' },
    ];
    
    // Note: Analytics properties (hs_analytics_source, etc.) are optional
    // and might not exist in all HubSpot accounts, so we skip them to avoid errors
    
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
              // Only update core properties for existing contacts
            ],
          }),
        }
      );

      if (updateResponse.ok) {
        try {
          const updateData = await updateResponse.json();
          contactId = updateData.vid || updateData.id;
          hubspotSaved = true;
          safeLog.log(`Updated existing contact in HubSpot: ${isDevelopment ? contactId : '***'}`);
        } catch (parseError) {
          safeLog.error('Failed to parse HubSpot update response:', parseError);
          hubspotSaved = false;
        }
        // Continue to send welcome email (don't return early)
      } else {
        // If update failed, log but continue (don't fail signup)
        let updateErrorData;
        try {
          updateErrorData = await updateResponse.json();
        } catch (e) {
          updateErrorData = { message: `HTTP ${updateResponse.status}` };
        }
        safeLog.error('HubSpot update error (contact exists but update failed):', {
          status: updateResponse.status,
          error: isDevelopment ? updateErrorData : maskSensitiveData(updateErrorData)
        });
        hubspotSaved = false;
        // Continue anyway - we'll try to send email
      }
    }
    
    if (!response.ok) {
      // HubSpot API failed - log error but don't fail signup
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        // If response isn't JSON, get text
        const textError = await response.text();
        errorData = { message: textError || `HTTP ${response.status}: ${response.statusText}` };
      }
      
      const errorMessage = errorData.message || 
                          errorData.errors?.[0]?.message || 
                          errorData.errors?.[0]?.error || 
                          `HTTP ${response.status}: ${response.statusText}`;
      
      // Log error details (masked in production)
      safeLog.error('HubSpot API Error (continuing anyway):', {
        status: response.status,
        statusText: response.statusText,
        error: isDevelopment ? errorData : maskSensitiveData(errorData),
        message: errorMessage,
        properties: isDevelopment ? properties : maskSensitiveData(properties),
        apiKeyPresent: !!HUBSPOT_API_KEY,
        apiKeyLength: isDevelopment && HUBSPOT_API_KEY ? HUBSPOT_API_KEY.length : undefined
      });
      
      // Don't throw - continue to send welcome email even if HubSpot fails
      hubspotSaved = false;
    } else {
      // HubSpot succeeded
      try {
        const data = await response.json();
        contactId = data.vid || data.id;
        hubspotSaved = true;
        safeLog.log(`Created new contact in HubSpot: ${isDevelopment ? contactId : '***'}`);
      } catch (parseError) {
        safeLog.error('Failed to parse HubSpot response:', parseError);
        // Continue anyway - contact might have been created
        hubspotSaved = false;
      }
    }

    // contactId and hubspotSaved are already set above
    
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
        safeLog.log(`Welcome email sent via SendGrid to ${isDevelopment ? email : maskSensitiveData(email)}`);
        emailSent = true;
      } catch (sendGridError) {
        safeLog.error('SendGrid error:', sendGridError);
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
          safeLog.log(`Email sequence scheduled for ${isDevelopment ? email : maskSensitiveData(email)}: ${result.scheduledCount} emails`);
          sequenceScheduled = true;
        } else {
          safeLog.error('Failed to schedule email sequence:', result.error);
        }
      } catch (sequenceError) {
        safeLog.error('Email sequence scheduling error:', sequenceError);
        // Don't fail signup if sequence scheduling fails
      }
    }

    return res.json({
      success: true,
      message: 'Successfully added to mailing list',
      contactId: contactId,
      source: leadSource,
      emailSent: emailSent,
      hubspotSaved: hubspotSaved,
      sequenceScheduled: sequenceScheduled,
    });
  } catch (error) {
    // Log error details (masked in production)
    safeLog.error('Signup API Error:', {
      message: error.message,
      stack: isDevelopment ? error.stack : undefined,
      error: isDevelopment ? error : maskSensitiveData(error)
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

