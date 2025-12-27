# Landing Page for foundersinfra.com

Consulting-focused landing page with email signup and booking links. Ready to deploy on Vercel.

## Features

- ✅ Consulting services explanation (5 packages)
- ✅ Email signup form (HubSpot integration)
- ✅ Booking/contact links
- ✅ Responsive design
- ✅ SEO optimized

## Quick Deploy to Vercel

**See `DEPLOY.md` for detailed deployment instructions.**

Quick start:
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set root directory: `landing-page`
4. Add environment variables (see below)
5. Deploy!

## Environment Variables

### Required for Contact Management (HubSpot)
```bash
HUBSPOT_API_KEY=your_hubspot_api_key
```

### Required for Email Sending (SendGrid)
```bash
SENDGRID_API_KEY=your_sendgrid_api_key  # API Key Name: "Pragmatic Playbook"
SENDGRID_FROM_EMAIL=founders@foundersinfra.com  # Optional
SENDGRID_FROM_NAME=Founders Infrastructure       # Optional
```

### Required for Email Sequences (Cron Job)
```bash
CRON_SECRET=your_random_secret_here  # For securing cron job endpoint (optional but recommended)
```

**Setup:**
1. Get API keys from HubSpot and SendGrid
2. In Vercel dashboard → Project Settings → Environment Variables
3. Add all environment variables:
   - `HUBSPOT_API_KEY`
   - `SENDGRID_API_KEY` (the one you created - "Pragmatic Playbook")
   - `SENDGRID_FROM_EMAIL` (optional)
   - `SENDGRID_FROM_NAME` (optional)
   - `CRON_SECRET` (optional, for cron job security)
4. Redeploy

**Email Sequences:**
- Automatically scheduled when someone signs up
- Stored in HubSpot custom properties
- Processed hourly by Vercel cron job
- Uses SendGrid API key you created

**See `EMAIL-ARCHITECTURE.md` for detailed setup instructions.**

## Documentation

- **`DEPLOY.md`** - Detailed deployment guide
- **`EMAIL-ARCHITECTURE.md`** - Email system architecture (HubSpot + SendGrid)
- **`EMAIL-SEQUENCE-SETUP.md`** - Step-by-step email sequence configuration
- **`DNS-SETUP-NAMECHEAP.md`** - DNS setup for SendGrid domain authentication
- **`TROUBLESHOOTING.md`** - Common issues and solutions

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

### Email Integration

- **HubSpot**: Saves contacts to CRM (if `HUBSPOT_API_KEY` is set)
- **SendGrid**: Sends welcome emails and sequences (if `SENDGRID_API_KEY` is set)
- **Cron Job**: Processes scheduled email sequences hourly (automated via Vercel)

**How it works:**
1. User signs up → Contact saved to HubSpot
2. Welcome email sent immediately via SendGrid
3. Email sequence scheduled (stored in HubSpot)
4. Cron job runs hourly → Sends due emails via SendGrid

See `EMAIL-ARCHITECTURE.md` and `EMAIL-WORKER-SETUP.md` for complete setup guide.

## Build & Deploy

```bash
npm run build
npm start
```

Or just push to GitHub - Vercel auto-deploys!

