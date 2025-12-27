# Vercel DNS Setup for Namecheap - foundersinfra.com

## Quick Setup Guide

You need to add **2 DNS records** to Namecheap to connect your domain to Vercel.

---

## Step 1: Log in to Namecheap

1. Go to [namecheap.com](https://namecheap.com) → **Sign In**
2. **Domain List** → Find `foundersinfra.com` → Click **"Manage"**
3. Go to **"Advanced DNS"** tab
4. Scroll down to **"Host Records"** section

---

## Step 2: Add DNS Records

### Record 1: A Record for Root Domain (`foundersinfra.com`)

1. Click **"Add New Record"**
2. **Type:** Select **A Record**
3. **Host:** Enter `@` (or leave blank - Namecheap will auto-fill for root domain)
4. **Value:** Enter `216.150.1.1`
5. **TTL:** Automatic (or 30 min)
6. Click **Save** (green checkmark)

**What this does:** Points `foundersinfra.com` to Vercel's servers.

---

### Record 2: CNAME Record for WWW (`www.foundersinfra.com`)

1. Click **"Add New Record"**
2. **Type:** Select **CNAME Record**
3. **Host:** Enter `www`
4. **Value:** Enter `ca452895a4c44a31.vercel-dns-016.com.` (include the trailing dot)
5. **TTL:** Automatic
6. Click **Save**

**What this does:** Points `www.foundersinfra.com` to Vercel's servers.

---

## Step 3: Remove Conflicting Records (if any)

**Before adding the new records, check if you have any existing A or CNAME records for:**
- `@` (root domain)
- `www`

**If you see existing records that conflict:**
- Remove old A records for `@`
- Remove old CNAME records for `www`
- **Keep SendGrid records** (they're different - `emXXXX`, `s1._domainkey`, etc.)

---

## Step 4: Wait for DNS Propagation

**After adding records:**
- Wait **5-10 minutes** for DNS to propagate
- Can take up to 24-48 hours (usually much faster)

**Check if records are live:**
```bash
# Check A record
dig foundersinfra.com A

# Check CNAME record
dig www.foundersinfra.com CNAME
```

Or use online tools:
- [MXToolbox](https://mxtoolbox.com) - Enter domain, check DNS
- [DNS Checker](https://dnschecker.org) - Check global propagation

---

## Step 5: Verify in Vercel

1. **Go to Vercel Dashboard:**
   - Your project → **Settings** → **Domains**
   - Find `foundersinfra.com` and `www.foundersinfra.com`

2. **Status should change:**
   - From **"Invalid Configuration"** → **"Valid Configuration"** ✅
   - This can take 5-10 minutes after DNS records are added

3. **If still showing "Invalid Configuration":**
   - Double-check DNS records in Namecheap match exactly
   - Wait longer (up to 48 hours for full propagation)
   - Verify values match Vercel exactly (no typos)

---

## Namecheap-Specific Tips

### Common Issues:

**Issue: "Host" field confusion**
- For A record, use `@` or leave blank for root domain
- For CNAME record, use `www` (just the subdomain, not `www.foundersinfra.com`)

**Issue: "Value" field format**
- Copy exactly from Vercel
- For CNAME, include trailing dot (`.`) if Vercel shows it
- No extra spaces before/after

**Issue: Records not showing up**
- Wait 5-10 minutes after saving
- Refresh the page
- Check you're in "Advanced DNS" tab, not "Basic DNS"

**Issue: Can't find "Advanced DNS" tab**
- Make sure you're logged in
- Click "Manage" next to your domain first
- Then you'll see the tabs

### Visual Guide:

**Namecheap Advanced DNS should look like this:**
```
┌─────────────────────────────────────────┐
│ Host Records                            │
├─────────────────────────────────────────┤
│ Type │ Host │ Value                     │
│ A    │ @    │ 216.150.1.1               │
│ CNAME│ www  │ ca452895a4c44a31...       │
│ CNAME│ emXXXX│ emXXXX.sendgrid.net       │
│ CNAME│ s1._domainkey│ s1.domainkey...    │
│ CNAME│ s2._domainkey│ s2.domainkey...    │
│ TXT  │ @    │ v=spf1 include:...        │
└─────────────────────────────────────────┘
```

**Note:** You'll have both Vercel records AND SendGrid records. That's correct!

---

## After Verification

Once Vercel shows "Valid Configuration":

✅ **Your site will be live at:** `https://foundersinfra.com`  
✅ **WWW redirect:** `https://www.foundersinfra.com` → `https://foundersinfra.com`  
✅ **SSL certificate:** Auto-provisioned by Vercel (HTTPS enabled)

**Test it:**
1. Visit `https://foundersinfra.com` (should load your landing page)
2. Visit `https://www.foundersinfra.com` (should redirect to `foundersinfra.com`)
3. Check SSL certificate (should show green lock in browser)

---

## Quick Checklist

- [ ] Logged into Namecheap
- [ ] Went to Domain List → Manage → Advanced DNS
- [ ] Added A record: `@` → `216.150.1.1`
- [ ] Added CNAME record: `www` → `ca452895a4c44a31.vercel-dns-016.com.`
- [ ] Removed any conflicting old records
- [ ] Waited 5-10 minutes
- [ ] Verified in Vercel (status shows "Valid Configuration" ✅)
- [ ] Tested `https://foundersinfra.com` in browser

---

## Troubleshooting

### "Invalid Configuration" persists after 10 minutes

1. **Check DNS records match exactly:**
   - A record: `@` → `216.150.1.1`
   - CNAME: `www` → `ca452895a4c44a31.vercel-dns-016.com.`

2. **Verify records are live:**
   ```bash
   dig foundersinfra.com A
   dig www.foundersinfra.com CNAME
   ```
   Should show the Vercel values.

3. **Check for typos:**
   - No extra spaces
   - CNAME value includes trailing dot if Vercel shows it
   - Host field is exactly `@` (for A) and `www` (for CNAME)

4. **Wait longer:**
   - DNS can take up to 48 hours to fully propagate globally
   - Most cases resolve within 1-2 hours

### Site loads but shows "Invalid Certificate"

- Vercel auto-provisions SSL certificates
- Wait 5-10 minutes after DNS verification
- Clear browser cache
- Try incognito/private browsing mode

---

## Need Help?

**Namecheap Support:**
- [Help Center](https://www.namecheap.com/support/)
- Live Chat (available in dashboard)

**Vercel Support:**
- [vercel.com/support](https://vercel.com/support)
- [Documentation](https://vercel.com/docs/concepts/projects/domains)

**Common Questions:**
- **"How long does it take?"** Usually 5-10 minutes, can take up to 48 hours
- **"Do I need to change nameservers?"** No, if using Namecheap DNS
- **"Can I use Cloudflare instead?"** Yes, but then add records in Cloudflare, not Namecheap

---

**You're all set!** Once DNS records are added and verified, your site will be live at `https://foundersinfra.com` with automatic HTTPS.

