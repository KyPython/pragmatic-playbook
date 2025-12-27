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

### Required for Automated Email Sequences (SendGrid)
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com  # Optional
SENDGRID_FROM_NAME=Founders Infrastructure       # Optional
CRON_SECRET=your_random_secret_here  # Optional, for securing cron job
```

**Setup:**
1. Get API keys from HubSpot and SendGrid
2. In Vercel dashboard → Project Settings → Environment Variables
3. Add all environment variables
4. Redeploy

**Email Sequences:**
- ✅ **Fully automated** - No manual work needed!
- Welcome email sent immediately when someone signs up
- Follow-up emails sent automatically (Day 2, 5, 9, 13, 20)
- Processed hourly by Vercel cron job
- See `AUTOMATED-EMAIL-SETUP.md` for complete setup guide

## Documentation

- **`DEPLOY.md`** - Detailed deployment guide
- **`HUBSPOT-WORKFLOW-SETUP.md`** - Step-by-step HubSpot workflow setup for email sequences
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

- **HubSpot**: Saves contacts to CRM and triggers email workflows automatically

**How it works:**
1. User signs up → Contact saved to HubSpot with `lifecyclestage = 'subscriber'`
2. **Marketing Hub Starter:** Send emails manually from HubSpot
3. **Marketing Hub Professional:** Workflows automatically send email sequences

**Setup Options:**
- **Manual (Starter):** See `SIMPLE-EMAIL-SOLUTION.md` for manual email sending
- **Automated (Professional):** See `HUBSPOT-WORKFLOW-SETUP.md` for workflow setup
- **SendGrid:** See `SIMPLE-EMAIL-SOLUTION.md` for SendGrid alternative

## Build & Deploy

```bash
npm run build
npm start
```

Or just push to GitHub - Vercel auto-deploys!

