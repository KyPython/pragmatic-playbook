# Verify SendGrid Setup - Quick Checklist

## ✅ Step 1: Verify SendGrid Account

1. Go to SendGrid Dashboard
2. Check your plan shows "Email API" (not "End of Trial")
3. Verify you have email sends available (50,000/month on Starter)

## ✅ Step 2: Add Environment Variables to Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables:

**Required:**
```
HUBSPOT_API_KEY=your_hubspot_api_key
SENDGRID_API_KEY=your_sendgrid_api_key  # The "Pragmatic Playbook" key
```

**Optional (but recommended):**
```
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
CRON_SECRET=your_random_secret_here
```

**Important:** After adding variables, **redeploy** your project!

## ✅ Step 3: Verify SendGrid API Key

1. Go to SendGrid → Settings → API Keys
2. Find "Pragmatic Playbook" key
3. Verify it has "Mail Send" permissions
4. Copy the key (starts with `SG.`)
5. Make sure this exact key is in Vercel's `SENDGRID_API_KEY`

## ✅ Step 4: Create HubSpot Custom Properties

Go to HubSpot → Settings → Properties → Contacts:

Create these 3 properties:

1. **`scheduled_emails`**
   - Type: Single-line text
   - Label: Scheduled Emails
   - Internal: Yes

2. **`email_sequence`**
   - Type: Single-line text
   - Label: Email Sequence
   - Internal: Yes

3. **`sequence_start_date`**
   - Type: Date picker
   - Label: Sequence Start Date
   - Internal: Yes

## ✅ Step 5: Test the Flow

1. **Sign up on your landing page** with a test email (use your own email)
2. **Check your inbox** - You should receive welcome email immediately
3. **Check HubSpot:**
   - Go to Contacts → Find your test contact
   - Verify `lifecyclestage = 'subscriber'`
   - Check `scheduled_emails` property (should have JSON with 5 scheduled emails)
4. **Check Vercel logs:**
   - Go to Vercel → Your Project → Functions → `/api/signup`
   - Look for recent invocation
   - Should show `emailSent: true` and `sequenceScheduled: true`

## ✅ Step 6: Verify Cron Job

1. Go to Vercel → Your Project → **Crons** tab
2. You should see `/api/cron/process-email-queue` listed
3. Schedule: `0 * * * *` (hourly)
4. Check "Last Run" - Should show recent timestamp

## ✅ Step 7: Monitor Email Sending

**In 2 days:**
- Check your inbox for the Day 2 follow-up email
- Check Vercel → Functions → `/api/cron/process-email-queue` logs
- Should show "Sent: 1" in the response

**In SendGrid:**
- Go to SendGrid → Activity
- Search for your test email
- Should show "Processed" and "Delivered" status

## Troubleshooting

### Welcome Email Not Received

1. **Check Vercel logs** for `/api/signup` - Look for SendGrid errors
2. **Check SendGrid Activity** - See if email was processed
3. **Check spam folder** - SendGrid emails might go to spam initially
4. **Verify `SENDGRID_API_KEY`** in Vercel matches your SendGrid key

### Cron Job Not Running

1. **Check Vercel Crons tab** - Is it listed?
2. **Check cron job logs** - Any errors?
3. **Verify `CRON_SECRET`** if you set one (must match in both places)

### Follow-up Emails Not Sending

1. **Check HubSpot** - Does contact have `scheduled_emails` property?
2. **Check cron job logs** - Is it processing contacts?
3. **Check SendGrid Activity** - Are emails being sent?
4. **Wait for scheduled time** - Emails send at the scheduled date/time

## Next Steps

Once everything is verified:

1. ✅ Test with your own email first
2. ✅ Monitor for 2-3 days to see follow-up emails
3. ✅ Check SendGrid Activity for delivery status
4. ✅ Ready to go live!

---

**Everything should be automated now!** 🎉

