require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_API_URL = `https://api.hubapi.com/contacts/v1/contact`;

/**
 * Add contact to HubSpot
 */
async function addContactToHubSpot(email, firstName = '', lastName = '') {
  if (!HUBSPOT_API_KEY) {
    throw new Error('HubSpot API key not configured');
  }

  try {
    const response = await axios.post(
      HUBSPOT_API_URL,
      {
        properties: [
          {
            property: 'email',
            value: email
          },
          ...(firstName ? [{
            property: 'firstname',
            value: firstName
          }] : []),
          ...(lastName ? [{
            property: 'lastname',
            value: lastName
          }] : []),
          {
            property: 'lifecyclestage',
            value: 'subscriber'
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`
        }
      }
    );

    return {
      success: true,
      contactId: response.data.vid,
      message: 'Successfully added to mailing list'
    };
  } catch (error) {
    // Handle duplicate email (contact already exists)
    if (error.response?.status === 409) {
      // Try to update existing contact
      try {
        const emailParam = encodeURIComponent(email);
        const updateResponse = await axios.post(
          `${HUBSPOT_API_URL}/createOrUpdate/email/${emailParam}`,
          {
            properties: [
              {
                property: 'lifecyclestage',
                value: 'subscriber'
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`
            }
          }
        );

        return {
          success: true,
          contactId: updateResponse.data.vid,
          message: 'Email already registered, updated subscription status'
        };
      } catch (updateError) {
        throw new Error('Failed to update existing contact');
      }
    }

    // Log error details for debugging
    console.error('HubSpot API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });

    throw new Error(error.response?.data?.message || 'Failed to add contact to HubSpot');
  }
}

/**
 * API endpoint to handle email signup
 */
app.post('/api/signup', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Add to HubSpot
    const result = await addContactToHubSpot(email, firstName, lastName);

    res.json({
      success: true,
      message: result.message,
      contactId: result.contactId
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process signup'
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hubspotConfigured: !!HUBSPOT_API_KEY
  });
});

/**
 * Serve landing page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email signup server running on port ${PORT}`);
  console.log(`HubSpot configured: ${HUBSPOT_API_KEY ? 'Yes' : 'No'}`);
  if (!HUBSPOT_API_KEY) {
    console.warn('⚠️  Warning: HUBSPOT_API_KEY not set. Signup will fail.');
  }
});

module.exports = app;

