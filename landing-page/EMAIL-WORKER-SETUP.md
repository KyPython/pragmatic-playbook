# Email Sequence Setup Guide

## Overview

This landing page has its **own email sequence system** using SendGrid. No external services needed!

**How it works:**
1. User signs up → Contact saved to HubSpot
2. Welcome email → Sent immediately via SendGrid
3. Email sequence scheduled → Stored in HubSpot custom properties
4. Cron job runs hourly → Processes and sends due emails via SendGrid

## What's Already Built

✅ **Email Sequence Service** (`pages/api/services/email-sequences.js`)
- 6 email templates (welcome, day 2, 5, 9, 13, 20)
- Scheduling logic
- SendGrid integration

✅ **Cron Job** (`pages/api/cron/process-email-queue.js`)
- Runs hourly via Vercel
- Processes scheduled emails
- Sends via SendGrid

✅ **Signup API Integration** (`pages/api/signup.js`)
- Automatically schedules sequences after welcome email
- Stores in HubSpot for processing

✅ **Vercel Configuration** (`vercel.json`)
- Cron job configured
- Runs automatically

## Setup Steps

### Step 1: Create HubSpot Custom Properties

Go to HubSpot → Settings → Properties → Contacts and create:

1. **`scheduled_emails`** (Single-line text)
   - Stores JSON array of scheduled emails
   - Internal property (not shown to users)

2. **`email_sequence`** (Single-line text)
   - Sequence name (e.g., "foundersinfra-welcome")
   - Internal property

3. **`sequence_start_date`** (Date picker)
   - When the sequence started
   - Internal property

See `EMAIL-SEQUENCE-SETUP.md` for detailed instructions.

### Step 2: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
HUBSPOT_API_KEY=your_hubspot_api_key
SENDGRID_API_KEY=your_sendgrid_api_key  # The one you created - "Pragmatic Playbook"
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
CRON_SECRET=your_random_secret_here  # Optional but recommended
```

### Step 3: Deploy

The cron job is already configured in `vercel.json`. Just deploy and it will run automatically.

### Step 4: Test

1. Sign up on the landing page
2. Check HubSpot → Verify `scheduled_emails` property is set
3. Wait for cron job (or trigger manually)
4. Verify emails are sent via SendGrid

## Email Sequence

**Sequence:** `foundersinfra-welcome`

- **Day 0:** Welcome (sent immediately)
- **Day 2:** The $50K Technical Debt Problem
- **Day 5:** How to Recover Lost Velocity
- **Day 9:** Real Results from Infrastructure Consulting
- **Day 13:** Ready to Recover $50K+ in Lost Velocity?
- **Day 20:** Following up on infrastructure consulting

## Manual Testing

### Test Cron Job

```bash
curl -X POST https://your-vercel-url.vercel.app/api/cron/process-email-queue \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Check Scheduled Emails

1. Go to HubSpot → Contacts
2. Find a contact
3. Check `scheduled_emails` property
4. Should see JSON array with scheduled emails

## Troubleshooting

**Emails not sending?**
- Check SendGrid API key in Vercel
- Check HubSpot custom properties exist
- Check cron job logs in Vercel
- Check SendGrid activity dashboard

**Cron job not running?**
- Verify `vercel.json` has cron configuration
- Check Vercel deployment is latest
- Check Vercel cron logs

**Scheduled emails not stored?**
- Check HubSpot API key
- Verify custom properties exist
- Check signup API logs

## Next Steps

1. ✅ Email sequence service created
2. ✅ Cron job created
3. ✅ Signup API integrated
4. ⏳ Create HubSpot custom properties
5. ⏳ Set environment variables
6. ⏳ Deploy and test

---

**Everything is ready!** Just create the HubSpot properties and deploy. The email sequences will work automatically using your SendGrid API key.
