# Automated Email Sequence Setup

## Overview

**Fully automated email sequences** using SendGrid. No manual work needed!

**How it works:**
1. User signs up → Contact saved to HubSpot
2. Welcome email → Sent immediately via SendGrid
3. Email sequence scheduled → Stored in HubSpot
4. Cron job runs hourly → Sends due emails automatically

## Setup Steps

### 1. Get SendGrid API Key

1. Go to SendGrid → Settings → API Keys
2. Create new API key (name it "Pragmatic Playbook")
3. Give it "Mail Send" permissions
4. Copy the API key (starts with `SG.`)

### 2. Set Environment Variables in Vercel

Go to Vercel Dashboard → Project Settings → Environment Variables:

```
HUBSPOT_API_KEY=your_hubspot_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
CRON_SECRET=your_random_secret_here  # Optional but recommended
```

### 3. Create HubSpot Custom Properties

Go to HubSpot → Settings → Properties → Contacts and create:

- **`scheduled_emails`** (Single-line text) - Stores scheduled email queue
- **`email_sequence`** (Single-line text) - Sequence name
- **`sequence_start_date`** (Date picker) - When sequence started

### 4. Authenticate SendGrid Domain (Important!)

For best deliverability, authenticate your domain:

1. Go to SendGrid → Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Enter `foundersinfra.com`
4. Add DNS records to Namecheap (see `DNS-SETUP-NAMECHEAP.md`)
5. Verify domain

### 5. Deploy and Test

1. Push changes to GitHub (Vercel auto-deploys)
2. Sign up with a test email on your landing page
3. Check your inbox for welcome email
4. Wait 2 days, check for follow-up email
5. Monitor in Vercel → Functions → `/api/cron/process-email-queue`

## Email Sequence Schedule

- **Day 0:** Welcome email (sent immediately)
- **Day 2:** The $50K Technical Debt Problem
- **Day 5:** How to Recover Lost Velocity
- **Day 9:** Real Results from Infrastructure Consulting
- **Day 13:** Ready to Recover $50K+ in Lost Velocity?
- **Day 20:** Following up on infrastructure consulting

## How It Works (Technical)

1. **Signup API** (`/api/signup`):
   - Saves contact to HubSpot
   - Sends welcome email immediately via SendGrid
   - Schedules remaining emails in HubSpot custom property

2. **Cron Job** (`/api/cron/process-email-queue`):
   - Runs hourly via Vercel
   - Fetches contacts with scheduled emails from HubSpot
   - Checks which emails are due
   - Sends via SendGrid
   - Updates HubSpot with sent status

## Troubleshooting

### Emails Not Sending

1. **Check SendGrid API key** in Vercel environment variables
2. **Check SendGrid account** - Make sure it's activated (not trial)
3. **Check cron job logs** in Vercel → Functions → `/api/cron/process-email-queue`
4. **Check HubSpot custom properties** - Make sure `scheduled_emails` exists

### Cron Job Not Running

1. **Check Vercel cron configuration** - Should be in `vercel.json`
2. **Check cron job logs** in Vercel dashboard
3. **Verify `CRON_SECRET`** matches in Vercel and cron job

### Domain Authentication Issues

See `DNS-SETUP-NAMECHEAP.md` for Namecheap-specific DNS setup.

## Benefits

✅ **Fully automated** - No manual work  
✅ **Scalable** - Handles any number of signups  
✅ **Reliable** - SendGrid's proven deliverability  
✅ **Trackable** - All emails logged in HubSpot  
✅ **Flexible** - Easy to update email content or timing  

---

**That's it!** Your email sequences are now fully automated. No manual work needed! 🎉

