# Landing Page for foundersinfra.com

Consulting-focused landing page with email signup and booking links. Ready to deploy on Vercel.

## Features

- ✅ Consulting services explanation (5 packages)
- ✅ Email signup form (HubSpot integration)
- ✅ Booking/contact links
- ✅ Responsive design
- ✅ SEO optimized

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd landing-page
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: foundersinfra-landing
# - Directory: ./landing-page
# - Override settings? No
```

### Option 2: Deploy via GitHub

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Set root directory to `landing-page`
5. Deploy!

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import Git repository
4. Set root directory: `landing-page`
5. Framework preset: Next.js
6. Deploy!

## Environment Variables

For email signup to work with HubSpot:

1. Get HubSpot API key from [HubSpot Settings](https://app.hubspot.com/settings/integrations/api-key)
2. In Vercel dashboard → Project Settings → Environment Variables
3. Add `HUBSPOT_API_KEY` with your API key
4. Redeploy

If HubSpot is not configured, signups will still work but won't be saved.

## Custom Domain Setup

After deployment:

1. Go to Vercel project settings
2. Click "Domains"
3. Add `foundersinfra.com`
4. Update DNS records as instructed
5. SSL certificate auto-provisioned

## Local Development

```bash
cd landing-page
npm install
npm run dev
```

Visit `http://localhost:3000`

## Features

- ✅ Responsive design (mobile + desktop)
- ✅ Modern gradient design
- ✅ Clear value proposition
- ✅ CTA buttons pointing to foundersinfra.com
- ✅ SEO optimized
- ✅ Fast loading (Next.js)
- ✅ Ready for production

## Customization

### Update Booking Link

Edit `pages/index.js` and replace:
```javascript
href="https://calendly.com/kyjahn-smith/consultation"
```
with your actual Calendly or booking link.

### Update Email Address

Replace:
```javascript
href="mailto:hello@foundersinfra.com"
```
with your contact email.

### Update Services/Pricing

Edit the service cards in the `services` section to match your offerings.

### HubSpot Integration

The email signup form automatically integrates with HubSpot if `HUBSPOT_API_KEY` is set in environment variables.

## Build & Deploy

```bash
npm run build
npm start
```

Or just push to GitHub - Vercel auto-deploys!

