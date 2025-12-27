# DNS Setup for Namecheap - foundersinfra.com

## Quick Start (Namecheap-Specific)

Since you bought the domain from Namecheap, here's the exact steps:

---

## Step 1: Get DNS Records from SendGrid

1. **Go to SendGrid Dashboard:**
   - [sendgrid.com](https://sendgrid.com) → Log in
   - **Settings** (gear icon) → **Sender Authentication**
   - Click **"Authenticate Your Domain"**

2. **Enter Domain:**
   - Domain: `foundersinfra.com`
   - Domain Provider: Select **"Other"** (Namecheap isn't in the list)
   - Click **Next**

3. **Copy the DNS Records:**
   - SendGrid will show you 4 records to add
   - **Keep this page open** - you'll need to copy these values
   - They'll look something like:
     ```
     CNAME: em9512 → em9512.sendgrid.net
     CNAME: s1._domainkey → s1.domainkey.sendgrid.net
     CNAME: s2._domainkey → s2.domainkey.sendgrid.net
     TXT: @ → v=spf1 include:sendgrid.net ~all
     ```

---

## Step 2: Add Records in Namecheap

### Option A: Using Namecheap BasicDNS (Default)

1. **Log in to Namecheap:**
   - Go to [namecheap.com](https://namecheap.com)
   - Click **Sign In** (top right)

2. **Go to Domain List:**
   - Click **Domain List** in the left sidebar
   - Find `foundersinfra.com`
   - Click **Manage** button

3. **Go to Advanced DNS:**
   - Click **Advanced DNS** tab
   - Scroll down to **"Host Records"** section

4. **Add Each Record:**

   **Record 1: CNAME for Email**
   - Click **Add New Record**
   - **Type:** Select **CNAME Record**
   - **Host:** Enter exactly what SendGrid shows (e.g., `em9512`)
   - **Value:** Enter exactly what SendGrid shows (e.g., `em9512.sendgrid.net`)
   - **TTL:** Automatic (or 30 min)
   - Click **Save** (green checkmark)

   **Record 2: CNAME for DKIM Key 1**
   - Click **Add New Record**
   - **Type:** Select **CNAME Record**
   - **Host:** Enter exactly what SendGrid shows (e.g., `s1._domainkey`)
   - **Value:** Enter exactly what SendGrid shows (e.g., `s1.domainkey.sendgrid.net`)
   - **TTL:** Automatic
   - Click **Save**

   **Record 3: CNAME for DKIM Key 2**
   - Click **Add New Record**
   - **Type:** Select **CNAME Record**
   - **Host:** Enter exactly what SendGrid shows (e.g., `s2._domainkey`)
   - **Value:** Enter exactly what SendGrid shows (e.g., `s2.domainkey.sendgrid.net`)
   - **TTL:** Automatic
   - Click **Save**

   **Record 4: TXT for SPF**
   - Click **Add New Record**
   - **Type:** Select **TXT Record**
   - **Host:** Enter `@` (or leave blank - Namecheap will auto-fill)
   - **Value:** Enter exactly what SendGrid shows (e.g., `v=spf1 include:sendgrid.net ~all`)
   - **TTL:** Automatic
   - Click **Save**

5. **Verify All Records Added:**
   - You should see all 4 records in the Host Records list
   - Double-check values match SendGrid exactly

---

### Option B: Using Custom DNS (Cloudflare, etc.)

If you're using Cloudflare or another DNS provider:

1. **Check Name Servers:**
   - In Namecheap → Domain List → Manage → **Nameservers**
   - If it shows Cloudflare nameservers (ns1.cloudflare.com, etc.), you're using Cloudflare
   - **Go to Cloudflare** to add DNS records (see `DNS-SETUP-GUIDE.md`)

2. **If Using Namecheap DNS:**
   - Follow Option A above

---

## Step 3: Wait for DNS Propagation

**After adding records:**
- Wait **5-10 minutes** for DNS to propagate
- Can take up to 24-48 hours (usually much faster)

**Check if records are live:**
```bash
# Check CNAME record
dig em9512.foundersinfra.com CNAME

# Check TXT record
dig foundersinfra.com TXT
```

Or use online tools:
- [MXToolbox](https://mxtoolbox.com) - Enter domain, check DNS
- [DNS Checker](https://dnschecker.org) - Check global propagation

---

## Step 4: Verify in SendGrid

1. **Go back to SendGrid:**
   - Settings → Sender Authentication → Domain Authentication
   - Find `foundersinfra.com` in the list

2. **Click "Verify":**
   - SendGrid will automatically check all DNS records
   - If all records are correct, status changes to **"Verified"** ✅

3. **If verification fails:**
   - Double-check all 4 records are added correctly in Namecheap
   - Wait longer (up to 48 hours for full propagation)
   - Verify values match SendGrid exactly (no typos, no extra spaces)

---

## Namecheap-Specific Tips

### Common Issues:

**Issue: "Host" field confusion**
- For CNAME records, the "Host" is the subdomain (e.g., `em9512`)
- For TXT records, use `@` or leave blank for root domain

**Issue: "Value" field format**
- Copy exactly from SendGrid
- No extra spaces before/after
- Namecheap may add quotes automatically - that's OK

**Issue: Records not showing up**
- Wait 5-10 minutes after saving
- Refresh the page
- Check you're in "Advanced DNS" tab, not "Basic DNS"

**Issue: Can't find "Advanced DNS" tab**
- Make sure you're logged in
- Click "Manage" next to your domain first
- Then you'll see the tabs

### Visual Guide:

**Namecheap Advanced DNS looks like this:**
```
┌─────────────────────────────────────────┐
│ Host Records                            │
├─────────────────────────────────────────┤
│ Type │ Host      │ Value                │
│ CNAME│ em9512    │ em9512.sendgrid.net  │
│ CNAME│ s1._domainkey│ s1.domainkey...   │
│ CNAME│ s2._domainkey│ s2.domainkey...   │
│ TXT  │ @         │ v=spf1 include:...   │
└─────────────────────────────────────────┘
```

---

## After Verification

Once SendGrid shows "Verified":

✅ **Emails will send from:** `founders@foundersinfra.com` (clean, no "via sendgrid.net")  
✅ **Better deliverability:** Inbox providers trust authenticated domains  
✅ **Professional appearance**

**Test it:**
1. Sign up on your landing page
2. Check welcome email
3. Verify "From" address shows `founders@foundersinfra.com` (not "via sendgrid.net")

---

## Quick Checklist

- [ ] Logged into Namecheap
- [ ] Went to Domain List → Manage → Advanced DNS
- [ ] Added 3 CNAME records (exact values from SendGrid)
- [ ] Added 1 TXT record (exact value from SendGrid)
- [ ] Waited 5-10 minutes
- [ ] Verified in SendGrid (clicked "Verify" button)
- [ ] Status shows "Verified" ✅

---

## Need Help?

**Namecheap Support:**
- [Help Center](https://www.namecheap.com/support/)
- Live Chat (available in dashboard)

**SendGrid Support:**
- [support.sendgrid.com](https://support.sendgrid.com)
- Email: support@sendgrid.com

**Common Questions:**
- **"How long does it take?"** Usually 5-10 minutes, can take up to 48 hours
- **"Do I need to change nameservers?"** No, if using Namecheap DNS
- **"Can I use Cloudflare instead?"** Yes, but then add records in Cloudflare, not Namecheap

---

**You're all set!** Once DNS records are added and verified, your emails will send from `founders@foundersinfra.com` with full domain authentication.

