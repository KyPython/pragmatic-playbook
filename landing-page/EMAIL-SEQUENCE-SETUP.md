# Email Sequence Setup Guide

**See `EMAIL-ARCHITECTURE.md` for architecture overview. See `README.md` for quick start.**

## Overview

This landing page uses **SendGrid** (with the API key you created) to send automated email sequences. Here's how to set it up:

## How It Works

1. **User signs up** → Contact saved to HubSpot
2. **Welcome email** → Sent immediately via SendGrid
3. **Email sequence scheduled** → Stored in HubSpot custom properties
4. **Cron job runs hourly** → Processes and sends due emails via SendGrid

## Setup Steps

### 1. Create HubSpot Custom Properties

Go to HubSpot → Settings → Properties → Contacts and create these properties:

#### Property 1: `scheduled_emails`
- **Type:** Single-line text
- **Label:** Scheduled Emails
- **Description:** JSON array of scheduled emails with dates and templates
- **Internal:** Yes (not shown to users)

#### Property 2: `email_sequence`
- **Type:** Single-line text
- **Label:** Email Sequence
- **Description:** Name of the email sequence (e.g., "foundersinfra-welcome")
- **Internal:** Yes

#### Property 3: `sequence_start_date`
- **Type:** Date picker
- **Label:** Sequence Start Date
- **Description:** When the email sequence started
- **Internal:** Yes

### 2. Set Environment Variables in Vercel

Go to Vercel Dashboard → Project Settings → Environment Variables:

```
HUBSPOT_API_KEY=your_hubspot_api_key
SENDGRID_API_KEY=your_sendgrid_api_key  # The one you created - "Pragmatic Playbook"
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
CRON_SECRET=your_random_secret_here  # Optional but recommended
```

### 3. Verify Cron Job is Configured

The cron job is already configured in `vercel.json`:
- **Path:** `/api/cron/process-email-queue`
- **Schedule:** Every hour (`0 * * * *`)

Vercel will automatically set this up when you deploy.

### 4. Test the Flow

1. **Sign up on the landing page** with a test email
2. **Check HubSpot** → Verify contact was created
3. **Check HubSpot custom properties** → Verify `scheduled_emails` has JSON array
4. **Wait for cron job** (or trigger manually) → Verify emails are sent

## Email Sequence Details

**Sequence Name:** `foundersinfra-welcome`

**Emails:**
- Day 0: Welcome (sent immediately)
- Day 2: The $50K Technical Debt Problem
- Day 5: How to Recover Lost Velocity
- Day 9: Real Results from Infrastructure Consulting
- Day 13: Ready to Recover $50K+ in Lost Velocity?
- Day 20: Following up on infrastructure consulting

## Manual Testing

### Test Cron Job Manually

```bash
curl -X POST https://your-vercel-url.vercel.app/api/cron/process-email-queue \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Check Scheduled Emails in HubSpot

1. Go to HubSpot → Contacts
2. Find a contact
3. Check `scheduled_emails` property
4. Should see JSON like:
```json
[
  {
    "subject": "The $50K Technical Debt Problem",
    "template": "pain-point",
    "scheduledFor": "2025-01-15T10:00:00.000Z",
    "sent": false
  },
  ...
]
```

## Troubleshooting

### Emails Not Sending

1. **Check SendGrid API key** → Verify it's set in Vercel
2. **Check HubSpot custom properties** → Verify they exist
3. **Check cron job logs** → Go to Vercel → Functions → View logs
4. **Check SendGrid activity** → Go to SendGrid → Activity

### Cron Job Not Running

1. **Verify `vercel.json`** → Check cron configuration
2. **Check Vercel deployment** → Make sure latest code is deployed
3. **Check Vercel cron logs** → Go to Vercel → Cron Jobs

### Scheduled Emails Not Stored

1. **Check HubSpot API key** → Verify it's set
2. **Check custom properties** → Verify they exist in HubSpot
3. **Check signup API logs** → Look for errors in Vercel logs

## Next Steps

1. ✅ Create HubSpot custom properties
2. ✅ Set environment variables in Vercel
3. ✅ Deploy to Vercel
4. ✅ Test signup flow
5. ✅ Verify cron job is running
6. ✅ Monitor email delivery

---

**That's it!** Your email sequences will now work automatically using the SendGrid API key you created.

