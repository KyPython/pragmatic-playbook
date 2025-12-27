# Email Signup with HubSpot Integration

Production-ready email signup form that automatically adds contacts to your HubSpot database.

## Features

- ✅ Beautiful, responsive signup form
- ✅ Automatic HubSpot contact creation
- ✅ Handles duplicate emails gracefully
- ✅ Email validation
- ✅ Error handling and user feedback
- ✅ Ready to deploy

## Setup

### 1. Get HubSpot API Key

1. Log in to your HubSpot account
2. Go to **Settings** → **Integrations** → **API key**
3. Create a new API key or copy existing one
4. Copy your Portal ID (found in the same settings page)

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your HubSpot credentials
HUBSPOT_API_KEY=your_actual_api_key
HUBSPOT_PORTAL_ID=your_portal_id
PORT=3001
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on `http://localhost:3001`

## Usage

### Access the Signup Form

Open `http://localhost:3001` in your browser to see the signup form.

### API Endpoint

You can also use the API directly:

```bash
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Response

**Success:**
```json
{
  "success": true,
  "message": "Successfully added to mailing list",
  "contactId": "12345678"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `email-signup` directory
3. Add environment variables in Vercel dashboard:
   - `HUBSPOT_API_KEY`
   - `HUBSPOT_PORTAL_ID`

### Deploy to Railway

1. Connect your GitHub repo to Railway
2. Set root directory to `email-signup`
3. Add environment variables in Railway dashboard
4. Deploy!

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set HUBSPOT_API_KEY=your_key
heroku config:set HUBSPOT_PORTAL_ID=your_id
git push heroku main
```

## HubSpot Contact Properties

The signup form automatically sets these HubSpot properties:

- `email` - Contact email (required)
- `firstname` - First name (optional)
- `lastname` - Last name (optional)
- `lifecyclestage` - Set to "subscriber"

## Customization

### Change Form Fields

Edit `public/index.html` to add/remove fields. Then update `server.js` to map new fields to HubSpot properties.

### Styling

All styles are in the `<style>` tag in `public/index.html`. Customize colors, fonts, and layout as needed.

### HubSpot Properties

To add more HubSpot properties, modify the `addContactToHubSpot` function in `server.js`:

```javascript
{
  property: 'your_custom_property',
  value: 'property_value'
}
```

## Testing

### Health Check

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "ok",
  "hubspotConfigured": true
}
```

### Test Signup

```bash
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Troubleshooting

### "HubSpot API key not configured"

- Check that `.env` file exists
- Verify `HUBSPOT_API_KEY` is set in `.env`
- Restart the server after changing `.env`

### "Failed to add contact to HubSpot"

- Verify your API key is valid
- Check HubSpot API rate limits
- Review server logs for detailed error messages

### Duplicate Email Handling

The system automatically handles duplicate emails by updating the existing contact's subscription status.

## Security Notes

- Never commit `.env` file to git
- Use environment variables in production
- Consider adding rate limiting for production
- Add CAPTCHA for spam protection if needed

## Next Steps

1. Customize the form design
2. Add email confirmation flow
3. Set up HubSpot workflows for new subscribers
4. Add analytics tracking
5. Create thank you page after signup

