# Troubleshooting Guide

**See `README.md` for setup overview. See `AUTOMATED-EMAIL-SETUP.md` for email setup details.**

## Common Issues

### Contacts Not Appearing in HubSpot

### 1. Check Vercel Environment Variables

**Go to Vercel Dashboard:**
1. Your project → **Settings** → **Environment Variables**
2. Verify `HUBSPOT_API_KEY` is set
3. Make sure it's set for **Production** environment
4. **Redeploy** after adding/changing env vars

### 2. Check Vercel Function Logs

**To see what's actually happening:**
1. Go to Vercel Dashboard → Your project → **Functions** tab
2. Click on `/api/signup`
3. Look for recent invocations
4. Check the logs for:
   - "HubSpot API key not configured" (means env var missing)
   - "Failed to add contact to HubSpot" (means API error)
   - Any error messages

### 3. Verify HubSpot API Key

**Get your API key:**
1. Go to HubSpot → **Settings** (gear icon)
2. **Integrations** → **Private Apps** (or **API Keys**)
3. Create a new private app or get existing API key
4. Make sure it has these scopes:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.schemas.contacts.write` (for custom properties)

### 4. Test the API Directly

**Test if the API key works:**
```bash
curl -X POST https://api.hubapi.com/contacts/v1/contact \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "properties": [
      {"property": "email", "value": "test@example.com"},
      {"property": "firstname", "value": "Test"},
      {"property": "lastname", "value": "User"}
    ]
  }'
```

**If this works:** The API key is good, check Vercel env vars  
**If this fails:** The API key is wrong or missing permissions

## Common Issues

### Issue: "HubSpot API key not configured"

**Cause:** Environment variable not set in Vercel

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add `HUBSPOT_API_KEY` with your key
3. Make sure it's set for **Production**
4. **Redeploy** the project

### Issue: "Failed to add contact to HubSpot"

**Causes:**
- API key expired or revoked
- API key missing permissions
- Custom properties don't exist in HubSpot

**Fix:**
1. Create new API key in HubSpot
2. Update in Vercel env vars
3. Redeploy
4. Create custom properties in HubSpot (if using them):
   - `signup_source`
   - `signup_url`
   - `signup_date`
   - `marketing_source`
   - `lead_source`

### Issue: Contacts created but not visible

**Causes:**
- Contacts in different view/filter
- Lifecycle stage filter hiding them
- Search filter too narrow

**Fix:**
1. Go to HubSpot → **Contacts**
2. Clear all filters
3. Check "All contacts" view
4. Search by email address

## Debug Steps

### Step 1: Check Browser Console

When you submit the form, open browser DevTools (F12):
1. Go to **Network** tab
2. Submit the form
3. Look for `/api/signup` request
4. Check the **Response** - does it show `hubspotSaved: true`?

### Step 2: Check Vercel Logs

1. Vercel Dashboard → Project → **Functions**
2. Find `/api/signup` function
3. Click on recent invocation
4. Check **Logs** tab for errors

### Step 3: Test API Key Manually

Use the curl command above to test if your API key works.

## Quick Test

**Test the signup flow:**
1. Go to your landing page
2. Open browser DevTools (F12) → **Network** tab
3. Submit the form with a test email
4. Check the response:
   - If `hubspotSaved: true` → Contact should be in HubSpot
   - If `hubspotSaved: false` or missing → Check Vercel logs

## Still Not Working?

1. **Check Vercel env vars** - Make sure `HUBSPOT_API_KEY` is set
2. **Check Vercel logs** - Look for error messages
3. **Test API key** - Use curl command above
4. **Check HubSpot permissions** - Make sure API key has write access
5. **Redeploy** - After changing env vars, always redeploy

