// API route for email signup (HubSpot integration)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
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
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
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
    const properties = [
      { property: 'email', value: email },
      ...(firstName ? [{ property: 'firstname', value: firstName }] : []),
      ...(lastName ? [{ property: 'lastname', value: lastName }] : []),
      { property: 'lifecyclestage', value: 'subscriber' },
      // Source tracking - standard HubSpot properties
      { property: 'hs_analytics_source', value: 'LANDING_PAGE' },
      { property: 'hs_analytics_source_data_1', value: 'foundersinfra.com' },
      { property: 'hs_analytics_source_data_2', value: 'Email Signup Form' },
      // Custom properties for clear source tracking (create these in HubSpot if needed)
      { property: 'signup_source', value: 'Landing Page - Email Signup Form' },
      { property: 'signup_url', value: sourceUrl },
      { property: 'signup_date', value: new Date().toISOString() },
      { property: 'marketing_source', value: marketingSource },
      { property: 'lead_source', value: leadSource },
      // Additional context
      { property: 'hs_lead_status', value: 'NEW' },
    ];

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
              // Update source tracking even for existing contacts
              { property: 'hs_analytics_source', value: 'LANDING_PAGE' },
              { property: 'hs_analytics_source_data_1', value: 'foundersinfra.com' },
              { property: 'signup_source', value: 'Landing Page - Email Signup Form' },
              { property: 'last_signup_date', value: new Date().toISOString() },
              { property: 'marketing_source', value: marketingSource },
              { property: 'lead_source', value: leadSource },
            ],
          }),
        }
      );

      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        const contactId = updateData.vid || updateData.id;

        // Enroll existing contact in workflow if not already enrolled
        const HUBSPOT_WORKFLOW_ID = process.env.HUBSPOT_WORKFLOW_ID;
        if (HUBSPOT_WORKFLOW_ID && contactId) {
          try {
            const workflowResponse = await fetch(
              `https://api.hubapi.com/automation/v3/workflows/${HUBSPOT_WORKFLOW_ID}/enrollments/contacts/${contactId}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
                },
              }
            );
            
            if (workflowResponse.ok) {
              console.log(`Contact ${contactId} enrolled in workflow`);
            }
          } catch (workflowError) {
            console.warn('Workflow enrollment error:', workflowError);
          }
        }

        return res.json({
          success: true,
          message: 'Email already registered, updated subscription status and source tracking',
          enrolled: !!HUBSPOT_WORKFLOW_ID,
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add contact to HubSpot');
    }

    const data = await response.json();
    const contactId = data.vid || data.id;

    // Enroll contact in email sequence workflow (if configured)
    const HUBSPOT_WORKFLOW_ID = process.env.HUBSPOT_WORKFLOW_ID;
    if (HUBSPOT_WORKFLOW_ID && contactId) {
      try {
        const workflowResponse = await fetch(
          `https://api.hubapi.com/automation/v3/workflows/${HUBSPOT_WORKFLOW_ID}/enrollments/contacts/${contactId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            },
          }
        );
        
        if (workflowResponse.ok) {
          console.log(`Contact ${contactId} enrolled in workflow ${HUBSPOT_WORKFLOW_ID}`);
        } else {
          console.warn('Failed to enroll in workflow, but contact was created');
        }
      } catch (workflowError) {
        console.warn('Workflow enrollment error:', workflowError);
        // Don't fail the signup if workflow enrollment fails
      }
    }

    return res.json({
      success: true,
      message: 'Successfully added to mailing list',
      contactId: contactId,
      source: leadSource,
      enrolled: !!HUBSPOT_WORKFLOW_ID,
    });
  } catch (error) {
    console.error('HubSpot API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process signup',
    });
  }
}

