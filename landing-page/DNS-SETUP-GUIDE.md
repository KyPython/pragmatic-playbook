# DNS Setup Guide for foundersinfra.com

## Quick Overview

To send emails from `founders@foundersinfra.com` (without "via sendgrid.net"), you need to authenticate your domain in SendGrid by adding DNS records.

**Time required:** 10-15 minutes  
**DNS propagation:** 24-48 hours (usually faster)

---

## Step-by-Step Instructions

### Step 1: Start Domain Authentication in SendGrid

1. **Go to SendGrid Dashboard:**
   - Log in at [sendgrid.com](https://sendgrid.com)
   - Navigate to **Settings** (gear icon) → **Sender Authentication**

2. **Click "Authenticate Your Domain":**
   - Under "Domain Authentication" section
   - Click the button

3. **Select Domain Provider:**
   - Choose your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap, Route53)
   - If your provider isn't listed, select **"Other"**

4. **Enter Domain:**
   - Type: `foundersinfra.com`
   - Click **Next**

5. **SendGrid Shows DNS Records:**
   - You'll see a list of DNS records to add
   - **Keep this page open** - you'll need to copy these records

---

### Step 2: Find Your DNS Provider

**Where is your domain registered?**

#### Option A: Domain Registrar (GoDaddy, Namecheap, Google Domains, etc.)
- DNS is managed where you bought the domain
- Go to your registrar's DNS settings

#### Option B: DNS Provider (Cloudflare, Route53, etc.)
- DNS is managed separately from where you bought the domain
- Go to your DNS provider's dashboard

#### Option C: Not Sure?
1. Go to [whois.net](https://www.whois.net)
2. Enter `foundersinfra.com`
3. Look for "Name Servers" - this tells you who manages DNS

**Common DNS providers:**
- `ns1.cloudflare.com` → Cloudflare
- `ns-*.awsdns-*.com` → AWS Route53
- `ns*.domaincontrol.com` → GoDaddy
- `dns*.registrar-servers.com` → Namecheap

---

### Step 3: Add DNS Records

**SendGrid will provide records like these (your values will be different):**

#### Record 1: CNAME for Email
```
Type: CNAME
Name: em9512 (or similar)
Value: em9512.sendgrid.net
TTL: 3600 (or default)
```

#### Record 2: CNAME for DKIM (Domain Key 1)
```
Type: CNAME
Name: s1._domainkey
Value: s1.domainkey.sendgrid.net
TTL: 3600
```

#### Record 3: CNAME for DKIM (Domain Key 2)
```
Type: CNAME
Name: s2._domainkey
Value: s2.domainkey.sendgrid.net
TTL: 3600
```

#### Record 4: TXT for SPF
```
Type: TXT
Name: @ (or leave blank, or use "foundersinfra.com")
Value: v=spf1 include:sendgrid.net ~all
TTL: 3600
```

**Important:** Copy the **exact values** from SendGrid - don't use the examples above!

---

### Step 4: Add Records to Your DNS Provider

#### If Using Cloudflare:

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your domain (`foundersinfra.com`)
3. Click **DNS** in the left sidebar
4. Click **Add record**
5. For each record from SendGrid:
   - Select **Type** (CNAME or TXT)
   - Enter **Name** (exactly as SendGrid shows)
   - Enter **Target/Value** (exactly as SendGrid shows)
   - **Proxy status:** DNS only (gray cloud, not orange)
   - Click **Save**
6. Repeat for all 4 records

#### If Using GoDaddy:

1. Go to [godaddy.com](https://godaddy.com) and log in
2. Go to **My Products** → **DNS** (next to your domain)
3. Scroll to **Records** section
4. Click **Add** for each record:
   - Select **Type** (CNAME or TXT)
   - Enter **Name** (exactly as SendGrid shows)
   - Enter **Value** (exactly as SendGrid shows)
   - **TTL:** 1 hour (or default)
   - Click **Save**
5. Repeat for all 4 records

#### If Using Namecheap:

1. Go to [namecheap.com](https://namecheap.com) and log in
2. Go to **Domain List** → Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Scroll to **Host Records** section
5. Click **Add New Record** for each:
   - Select **Type** (CNAME or TXT)
   - Enter **Host** (exactly as SendGrid shows)
   - Enter **Value** (exactly as SendGrid shows)
   - Click **Save**
6. Repeat for all 4 records

#### If Using AWS Route53:

1. Go to [AWS Console](https://console.aws.amazon.com) → Route53
2. Click **Hosted zones** → Select `foundersinfra.com`
3. Click **Create record**
4. For each record:
   - **Record name:** (exactly as SendGrid shows)
   - **Record type:** (CNAME or TXT)
   - **Value:** (exactly as SendGrid shows)
   - Click **Create records**
5. Repeat for all 4 records

#### If Using Other Providers:

The process is similar:
1. Find DNS/Records section
2. Add each record type (CNAME or TXT)
3. Use exact values from SendGrid
4. Save each record

---

### Step 5: Verify DNS Records

**Wait 5-10 minutes** after adding records, then verify:

#### Option A: Use Command Line
```bash
# Check CNAME records
dig em9512.foundersinfra.com CNAME

# Check TXT records
dig foundersinfra.com TXT

# Check DKIM records
dig s1._domainkey.foundersinfra.com CNAME
dig s2._domainkey.foundersinfra.com CNAME
```

**Expected output:** Should show the SendGrid values you added.

#### Option B: Use Online Tools
- [MXToolbox](https://mxtoolbox.com) - Enter domain, check DNS records
- [DNS Checker](https://dnschecker.org) - Check global DNS propagation

#### Option C: Check in SendGrid
1. Go back to SendGrid → **Sender Authentication**
2. Find `foundersinfra.com` in the list
3. Click **Verify** button
4. SendGrid will check DNS records automatically

---

### Step 6: Verify Domain in SendGrid

1. **Go back to SendGrid Dashboard:**
   - Settings → Sender Authentication → Domain Authentication

2. **Find your domain:**
   - Look for `foundersinfra.com` in the list
   - Status should show "Pending" or "Verifying"

3. **Click "Verify":**
   - SendGrid will check all DNS records
   - If all records are correct, status changes to **"Verified"** ✅

4. **If verification fails:**
   - Check that all 4 records are added correctly
   - Wait longer for DNS propagation (can take up to 48 hours)
   - Double-check values match SendGrid exactly (no typos)

---

## Common Issues & Solutions

### Issue: "DNS records not found"

**Causes:**
- DNS records not yet propagated (wait 24-48 hours)
- Wrong record values (typo in copy/paste)
- Records added to wrong domain

**Solutions:**
1. Wait 24 hours and try again
2. Double-check all values match SendGrid exactly
3. Verify records using `dig` or online tools
4. Make sure you're adding to `foundersinfra.com`, not a subdomain

### Issue: "CNAME record conflict"

**Causes:**
- Another CNAME record already exists with same name
- Can't have multiple CNAME records with same name

**Solutions:**
1. Check existing DNS records
2. Remove conflicting CNAME records
3. Or use a different subdomain (not recommended)

### Issue: "TXT record format error"

**Causes:**
- Extra spaces in TXT record
- Missing quotes
- Wrong format

**Solutions:**
1. Copy TXT record **exactly** from SendGrid
2. No extra spaces before/after
3. Some providers add quotes automatically - that's OK

### Issue: "Domain still shows 'via sendgrid.net' after verification"

**Causes:**
- Using Single Sender Verification instead of Domain Authentication
- Domain not fully verified
- DNS not fully propagated

**Solutions:**
1. Make sure you're using **Domain Authentication** (not Single Sender)
2. Wait 24-48 hours for full propagation
3. Check SendGrid shows domain as "Verified"

---

## After Verification

Once your domain is verified:

✅ **Emails will send from:** `founders@foundersinfra.com` (clean, no "via sendgrid.net")  
✅ **Better deliverability:** Inbox providers trust authenticated domains  
✅ **Professional appearance:** No "via sendgrid.net" text in email headers  

**Test it:**
1. Sign up on your landing page
2. Check welcome email
3. Verify "From" address shows `founders@foundersinfra.com` (not "via sendgrid.net")

---

## Quick Reference

**What you need:**
- Access to your DNS provider (where you manage foundersinfra.com DNS)
- SendGrid account (already have this)
- 10-15 minutes to add records

**Records to add:**
- 3 CNAME records (email, DKIM keys)
- 1 TXT record (SPF)

**Time to verify:**
- Usually 5-10 minutes
- Can take up to 48 hours for full DNS propagation

**Need help?**
- SendGrid support: [support.sendgrid.com](https://support.sendgrid.com)
- DNS provider support: Check your provider's help docs

---

**You're all set!** Once DNS records are added and verified, your emails will send from `founders@foundersinfra.com` with full domain authentication.

