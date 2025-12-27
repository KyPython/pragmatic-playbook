# SendGrid Integration Guide

## Overview

You can use SendGrid for transactional emails (welcome emails, confirmations) while still using HubSpot for:
- Contact management (CRM)
- Email sequences (workflows)
- Analytics and tracking

## Two Options

### Option 1: Hybrid Approach (Recommended)
- **SendGrid**: Transactional emails (welcome, confirmations)
- **HubSpot**: Contact management + email sequences
- **Best of both worlds**: Fast transactional + powerful sequences

### Option 2: SendGrid Only
- **SendGrid**: All emails (transactional + sequences)
- **HubSpot**: Just contact management
- **Simpler**: One email service, but you lose HubSpot sequences

## Setup: Hybrid Approach

### Step 1: Install SendGrid Package

```bash
cd landing-page
npm install @sendgrid/mail
```

### Step 2: Add Environment Variables to Vercel

Go to Vercel → Project Settings → Environment Variables:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
```

**Note:** Make sure `founders@foundersinfra.com` is verified in SendGrid.

### Step 3: Update Signup API

You have two options:

**A. Use the new hybrid route** (`signup-sendgrid.js`):
- Rename current `signup.js` to `signup-hubspot-only.js`
- Rename `signup-sendgrid.js` to `signup.js`
- This sends welcome email via SendGrid + saves to HubSpot

**B. Update existing route**:
- Add SendGrid code to current `signup.js`
- Keep HubSpot integration
- Send welcome email via SendGrid

### Step 4: Verify SendGrid Domain

1. **Go to SendGrid:**
   - Settings → Sender Authentication
   - Domain Authentication

2. **Add Domain:**
   - Enter: `foundersinfra.com`
   - SendGrid provides DNS records

3. **Add DNS Records:**
   - CNAME records (provided by SendGrid)
   - Add to your domain registrar
   - Wait for verification (5-10 minutes)

4. **Verify:**
   - SendGrid will verify automatically
   - Status shows "Verified"

### Step 5: Create Sender Email

1. **Go to SendGrid:**
   - Settings → Sender Authentication
   - Single Sender Verification

2. **Add Sender:**
   - Email: `founders@foundersinfra.com`
   - Name: `Founders Infrastructure`
   - Verify email (check inbox)

## How It Works

### When Someone Signs Up:

1. ✅ **Contact saved to HubSpot** (for CRM/sequences)
2. ✅ **Welcome email sent via SendGrid** (transactional, fast)
3. ✅ **Contact enrolled in HubSpot workflow** (for sequences)
4. ✅ **HubSpot sends sequence emails** (Day 7, 21, etc.)

### Email Flow:

```
Signup → SendGrid (Welcome) → HubSpot (Sequences)
         (Immediate)            (Scheduled)
```

## SendGrid Configuration

### Environment Variables

```bash
# Required
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Optional (with defaults)
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
```

### Defaults (if not set)

- `SENDGRID_FROM_EMAIL`: `noreply@foundersinfra.com`
- `SENDGRID_FROM_NAME`: `Founders Infrastructure`

## SendGrid vs HubSpot

### Use SendGrid For:
- ✅ Welcome emails (immediate)
- ✅ Confirmation emails
- ✅ Transactional notifications
- ✅ Fast delivery (better deliverability)

### Use HubSpot For:
- ✅ Email sequences (automated)
- ✅ Contact management (CRM)
- ✅ Analytics and tracking
- ✅ Lead nurturing

## Testing

1. **Test Signup:**
   ```bash
   # Sign up on landing page
   ```

2. **Check SendGrid:**
   - Activity → Email Activity
   - Should see welcome email sent
   - Status: "Delivered"

3. **Check HubSpot:**
   - Contacts → Find contact
   - Should see contact created
   - Should see workflow enrollment

4. **Check Email:**
   - Check inbox for welcome email
   - Verify sender: `founders@foundersinfra.com`
   - Verify styling matches landing page

## Troubleshooting

### SendGrid Not Sending

- **Check API Key**: Is `SENDGRID_API_KEY` set in Vercel?
- **Check Sender**: Is `founders@foundersinfra.com` verified?
- **Check Domain**: Is `foundersinfra.com` verified in SendGrid?
- **Check Logs**: Vercel function logs show errors

### Emails Going to Spam

- **Verify Domain**: Must be verified in SendGrid
- **Warm Up Domain**: Send to engaged contacts first
- **Check SPF/DKIM**: SendGrid handles this automatically
- **Use Subdomain**: Consider `mail.foundersinfra.com` for better deliverability

### HubSpot Not Saving

- **Check API Key**: Is `HUBSPOT_API_KEY` set?
- **Check Logs**: Vercel function logs
- **Fallback**: Code continues even if HubSpot fails

## Migration from HubSpot-Only

If you're currently using HubSpot for everything:

1. **Keep HubSpot workflows** (for sequences)
2. **Add SendGrid** (for welcome emails)
3. **Test thoroughly** before switching
4. **Monitor both** for first week

## Cost Comparison

### SendGrid
- **Free tier**: 100 emails/day
- **Essentials**: $19.95/month (50K emails)
- **Good for**: Transactional emails

### HubSpot
- **Free tier**: 2,000 emails/month
- **Starter**: $20/month (1,000 contacts)
- **Good for**: Sequences + CRM

### Hybrid Approach
- **Best value**: Use both for their strengths
- **SendGrid**: Transactional (fast, reliable)
- **HubSpot**: Sequences (automated, tracked)

## Next Steps

1. ✅ Install `@sendgrid/mail` package
2. ✅ Add SendGrid API key to Vercel
3. ✅ Verify domain in SendGrid
4. ✅ Update signup API to use SendGrid
5. ✅ Test welcome email delivery
6. ✅ Monitor both services

---

**You now have fast transactional emails via SendGrid + powerful sequences via HubSpot! 🚀**

