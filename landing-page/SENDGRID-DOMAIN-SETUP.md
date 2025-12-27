# SendGrid Domain Setup for foundersinfra.com

## Overview

You can use the **same SendGrid account** for both:
- Your SaaS (`useeasyflow.com`, `easyflow-app.duckdns.org`)
- Landing page (`foundersinfra.com`)

SendGrid supports multiple authenticated domains on one account.

## Quick Setup (5 Minutes)

### Step 1: Add Domain in SendGrid

1. Go to **SendGrid Dashboard** → **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain** (under Domain Authentication)
3. Select **Domain Provider** (or "Other" if not listed)
4. Enter domain: `foundersinfra.com`
5. Click **Next**

### Step 2: Add DNS Records

SendGrid will provide DNS records. Add these to your domain's DNS:

**Example records (SendGrid will give you exact values):**
```
Type: CNAME
Name: em9512 (or similar)
Value: em9512.sendgrid.net

Type: CNAME
Name: s1._domainkey
Value: s1.domainkey.sendgrid.net

Type: CNAME
Name: s2._domainkey
Value: s2.domainkey.sendgrid.net

Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
```

**Where to add:**
- If using a domain registrar (GoDaddy, Namecheap, etc.): DNS settings
- If using a DNS provider (Cloudflare, Route53, etc.): DNS records section

### Step 3: Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. Go back to SendGrid → **Sender Authentication**
3. Click **Verify** next to `foundersinfra.com`
4. Status should change to **Verified** ✅

### Step 4: Create Sender Email

1. Go to **Settings** → **Sender Authentication** → **Single Sender Verification**
2. Click **Verify a Single Sender**
3. Enter:
   - **From Email:** `founders@foundersinfra.com`
   - **From Name:** `Founders Infrastructure`
   - **Reply To:** `founders@foundersinfra.com` (or your personal email)
   - **Company Address:** (your address)
4. Click **Create**
5. Check your email and click verification link

**Note:** With Domain Authentication, you don't strictly need Single Sender Verification, but it's good practice.

### Step 5: Update Environment Variables

Your existing API key should work, but verify:

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Environment Variables**
2. Verify these are set:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=founders@foundersinfra.com
   SENDGRID_FROM_NAME=Founders Infrastructure
   HUBSPOT_API_KEY=your_hubspot_key
   ```

### Step 6: Test Email

Once domain is verified, test the signup flow:

1. Go to your landing page
2. Enter an email in the signup form
3. Submit
4. Check inbox for welcome email
5. Verify it's from `founders@foundersinfra.com` (not `via sendgrid.net`)

## Multiple Domains on One Account

**Benefits:**
- ✅ One API key for all domains
- ✅ Shared sending reputation (if good)
- ✅ Centralized billing
- ✅ One dashboard to manage

**Your Current Setup:**
- `em9512.easyflow-app.duckdns.org` (pending)
- `url484.easyflow-app.duckdns.org` (pending - link branding)
- `kyjahntsmith@gmail.com` (verified - single sender)
- `noreply@useeasyflow.com` (failed - needs domain auth)

**After Setup:**
- `foundersinfra.com` (new - for landing page)
- `useeasyflow.com` (existing - for SaaS)

## Troubleshooting

### Domain Verification Fails

**Common issues:**
1. **DNS not propagated:** Wait 24-48 hours for DNS changes
2. **Wrong DNS records:** Double-check values from SendGrid
3. **CNAME conflicts:** Make sure no other CNAME records conflict
4. **TXT record format:** Copy exactly from SendGrid (no extra spaces)

**Check DNS propagation:**
```bash
# Check CNAME records
dig em9512.foundersinfra.com CNAME

# Check TXT records
dig foundersinfra.com TXT
```

### Emails Still Show "via sendgrid.net"

**Causes:**
- Domain not fully verified
- Using Single Sender instead of Domain Authentication
- DNS records not propagated

**Fix:**
- Use Domain Authentication (not Single Sender)
- Wait for DNS propagation
- Verify domain status in SendGrid dashboard

### API Key Not Working

**Check:**
1. API key is correct (no extra spaces)
2. API key has "Mail Send" permissions
3. Environment variables set in Vercel
4. Redeploy after adding env vars

## Best Practices

1. **Use Domain Authentication** (not Single Sender) for production
2. **Set up DMARC** after domain is verified (improves deliverability)
3. **Monitor reputation** in SendGrid dashboard
4. **Use separate API keys** for different projects (optional, but recommended)
   - Create new API key: "Founders Infrastructure Landing Page"
   - Restrict permissions if needed

## Next Steps

1. ✅ Add `foundersinfra.com` domain in SendGrid
2. ✅ Add DNS records to your domain provider
3. ✅ Verify domain (wait 5-10 minutes)
4. ✅ Test email signup flow
5. ✅ Monitor first few emails for deliverability

## API Key Management

**Current API Key:** `Pragmatic Playbook`
- Used for: Landing page email sending
- Can also be used for: SaaS (if you want)

**Optional: Create Separate Key**
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: `Founders Infrastructure Landing Page`
4. Permissions: **Full Access** (or restrict to Mail Send only)
5. Copy new key
6. Update `SENDGRID_API_KEY` in Vercel

**Recommendation:** Use the same key for now (simpler). Create separate keys later if you need different permissions.

---

**You're all set!** Once the domain is verified, emails will send from `founders@foundersinfra.com` without the "via sendgrid.net" text.

