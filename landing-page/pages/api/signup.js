// API route for email signup (HubSpot integration)
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

  // HubSpot API integration
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
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
    // Try to create contact
    const response = await fetch(HUBSPOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: [
          { property: 'email', value: email },
          ...(firstName ? [{ property: 'firstname', value: firstName }] : []),
          ...(lastName ? [{ property: 'lastname', value: lastName }] : []),
          { property: 'lifecyclestage', value: 'subscriber' },
        ],
      }),
    });

    if (response.status === 409) {
      // Contact already exists, try to update
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
            ],
          }),
        }
      );

      if (updateResponse.ok) {
        return res.json({
          success: true,
          message: 'Email already registered, updated subscription status',
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add contact to HubSpot');
    }

    const data = await response.json();

    return res.json({
      success: true,
      message: 'Successfully added to mailing list',
      contactId: data.vid,
    });
  } catch (error) {
    console.error('HubSpot API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process signup',
    });
  }
}

