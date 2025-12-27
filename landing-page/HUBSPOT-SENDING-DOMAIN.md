# HubSpot Sending Domain Configuration

## ⚠️ Important: Domain Setup Required

**Emails are NOT automatically sent from `foundersinfra.com`** - you need to configure this in HubSpot.

## Current Status

- ✅ Contacts are created in HubSpot
- ✅ Contacts are enrolled in workflows
- ❌ **Sending domain NOT configured** (emails will come from HubSpot default domain)

## How to Configure Sending Domain

### Step 1: Verify Domain in HubSpot (15 minutes)

1. **Go to HubSpot Settings:**
   - Navigate to **Settings** → **Marketing** → **Email**
   - Click **Sending domains**

2. **Add Your Domain:**
   - Click **Connect a domain**
   - Enter: `foundersinfra.com`
   - Click **Connect**

3. **Add DNS Records:**
   HubSpot will show you DNS records to add. Add these to your domain registrar:

   **SPF Record:**
   ```
   Type: TXT
   Name: @ (or foundersinfra.com)
   Value: v=spf1 include:_spf.hubspot.com ~all
   TTL: 3600
   ```

   **DKIM Record:**
   ```
   Type: TXT
   Name: hubspot._domainkey (or hubspot._domainkey.foundersinfra.com)
   Value: [HubSpot will provide this - copy exactly]
   TTL: 3600
   ```

   **DMARC Record (Optional but Recommended):**
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@foundersinfra.com
   TTL: 3600
   ```

4. **Verify Domain:**
   - After adding DNS records, click **Verify** in HubSpot
   - Wait 5-10 minutes for DNS propagation
   - HubSpot will verify automatically

### Step 2: Set Up Sender Email Address (5 minutes)

1. **Go to Email Settings:**
   - **Settings** → **Marketing** → **Email** → **Email addresses**

2. **Add Sender Email:**
   - Click **Create email address**
   - Enter: `founders@foundersinfra.com`
   - Or: `hello@foundersinfra.com`
   - Click **Create**

3. **Verify Email:**
   - HubSpot will send verification email
   - Check inbox and click verification link
   - Email is now verified

4. **Set as Default:**
   - Mark as **Default sender**
   - Use for all workflows

### Step 3: Update Workflow Emails (10 minutes)

1. **Go to Your Workflow:**
   - **Automation** → **Workflows**
   - Open your email sequence workflow

2. **Update Each Email:**
   - Click on each email action
   - Set **From address**: `founders@foundersinfra.com`
   - Set **Reply-to**: `founders@foundersinfra.com` (or your personal email)
   - Save

3. **Test:**
   - Send test email to yourself
   - Verify it shows `founders@foundersinfra.com` as sender
   - Check spam folder if needed

## Alternative: Use HubSpot Default Domain (Not Recommended)

If you don't want to set up custom domain yet:
- Emails will come from `noreply@hubspot.com` or similar
- Lower deliverability
- Less professional
- **Not recommended for production**

## DNS Setup Guide by Registrar

### GoDaddy
1. Log in → **My Products** → **DNS**
2. Click **Add** → Select **TXT** record
3. Enter values from HubSpot
4. Save

### Namecheap
1. Log in → **Domain List** → **Manage**
2. Go to **Advanced DNS**
3. Click **Add New Record** → **TXT Record**
4. Enter values
5. Save

### Cloudflare
1. Log in → Select domain
2. Go to **DNS** → **Records**
3. Click **Add record**
4. Select **TXT**
5. Enter values
6. Save

## Verification Checklist

- [ ] Domain added to HubSpot
- [ ] SPF record added to DNS
- [ ] DKIM record added to DNS
- [ ] DMARC record added (optional)
- [ ] Domain verified in HubSpot (green checkmark)
- [ ] Sender email created (`founders@foundersinfra.com`)
- [ ] Sender email verified
- [ ] Workflow emails updated with sender address
- [ ] Test email sent and received
- [ ] Email shows correct sender domain

## Testing

1. **Send Test Email:**
   - Go to workflow
   - Send test email to yourself
   - Check sender address

2. **Check Email Headers:**
   - Open email
   - View email source/headers
   - Verify `From:` shows `founders@foundersinfra.com`
   - Verify SPF/DKIM pass

3. **Check Deliverability:**
   - Send to Gmail, Outlook, Apple Mail
   - Check spam folder
   - Verify emails arrive in inbox

## Troubleshooting

### Domain Not Verifying
- **Wait longer**: DNS can take up to 48 hours (usually 5-10 minutes)
- **Check DNS records**: Use `dig` or online DNS checker
- **Check TTL**: Lower TTL for faster updates
- **Remove old records**: Make sure no conflicting records

### Emails Going to Spam
- **Check SPF**: Must include `include:_spf.hubspot.com`
- **Check DKIM**: Must be exactly as HubSpot provides
- **Warm up domain**: Send to engaged contacts first
- **Check reputation**: Use tools like MXToolbox

### Sender Address Not Showing
- **Check workflow**: Each email must have sender set
- **Check default**: Set default sender in HubSpot
- **Re-verify**: Re-verify email address if needed

## Next Steps

1. ✅ Set up DNS records (SPF, DKIM, DMARC)
2. ✅ Verify domain in HubSpot
3. ✅ Create sender email (`founders@foundersinfra.com`)
4. ✅ Update workflow emails with sender address
5. ✅ Test and verify

---

**Once configured, all emails will be sent from `founders@foundersinfra.com`! 📧**

