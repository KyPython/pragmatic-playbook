# HubSpot Source Tracking Setup

Your landing page now tracks where contacts come from and sends this information to HubSpot.

## What's Being Tracked

Every signup includes:

### Standard HubSpot Properties
- **`hs_analytics_source`**: `LANDING_PAGE`
- **`hs_analytics_source_data_1`**: `foundersinfra.com`
- **`hs_analytics_source_data_2`**: `Email Signup Form`

### Custom Properties (Create in HubSpot)
- **`signup_source`**: `Landing Page - Email Signup Form`
- **`signup_url`**: The URL where they signed up
- **`signup_date`**: ISO timestamp of signup
- **`marketing_source`**: `foundersinfra.com` (or external source)
- **`lead_source`**: `Landing Page` (or variant)
- **`last_signup_date`**: Updated timestamp for existing contacts

## Setting Up Custom Properties in HubSpot

1. **Go to HubSpot Settings:**
   - Navigate to [Properties](https://app.hubspot.com/settings/properties/contacts)
   - Click **Create a property**

2. **Create Each Property:**
   
   **Property 1: signup_source**
   - Label: `Signup Source`
   - Type: `Single-line text`
   - Group: `Contact information` (or create new group)
   - Click **Create**

   **Property 2: signup_url**
   - Label: `Signup URL`
   - Type: `Single-line text`
   - Group: `Contact information`
   - Click **Create**

   **Property 3: signup_date**
   - Label: `Signup Date`
   - Type: `Date picker`
   - Group: `Contact information`
   - Click **Create**

   **Property 4: marketing_source**
   - Label: `Marketing Source`
   - Type: `Single-line text`
   - Group: `Contact information`
   - Click **Create**

   **Property 5: lead_source**
   - Label: `Lead Source`
   - Type: `Single-line text`
   - Group: `Contact information`
   - Click **Create**

   **Property 6: last_signup_date**
   - Label: `Last Signup Date`
   - Type: `Date picker`
   - Group: `Contact information`
   - Click **Create**

3. **Verify Properties:**
   - Go to a test contact
   - Check that properties are visible
   - Verify data is being populated

## How It Works

### New Contacts
When someone signs up:
1. Contact is created in HubSpot
2. All source properties are set
3. Lifecycle stage set to `subscriber`
4. Lead status set to `NEW`

### Existing Contacts
If email already exists:
1. Contact is found by email
2. Source properties are updated
3. `last_signup_date` is updated
4. Lifecycle stage updated to `subscriber`

## Viewing Source Data in HubSpot

### In Contact Records
1. Open any contact
2. Scroll to **Contact information** section
3. See:
   - `Signup Source`: "Landing Page - Email Signup Form"
   - `Signup URL`: The URL they came from
   - `Marketing Source`: "foundersinfra.com"
   - `Lead Source`: "Landing Page"

### In Reports
1. Go to **Reports** → **Custom Reports**
2. Create report with:
   - **Object:** Contacts
   - **Group by:** `Signup Source` or `Lead Source`
   - **Metrics:** Count of contacts

### In Lists
1. Create a list
2. Filter by:
   - `Signup Source` = "Landing Page - Email Signup Form"
   - `Marketing Source` = "foundersinfra.com"

## Testing

1. **Test Signup:**
   - Go to your landing page
   - Fill out the form
   - Submit

2. **Check HubSpot:**
   - Go to Contacts
   - Find your test contact
   - Verify all source properties are populated

3. **Test Existing Contact:**
   - Sign up with same email again
   - Check that `last_signup_date` is updated
   - Verify source properties are still set

## Troubleshooting

### Properties Not Showing
- **Issue:** Custom properties don't exist in HubSpot
- **Fix:** Create properties as described above
- **Note:** Properties must be created before data can be saved

### Source Not Tracking
- **Issue:** `signup_url` shows "direct"
- **Fix:** This is normal for direct visits (no referer)
- **Note:** HubSpot tracking code will also capture analytics

### API Errors
- **Issue:** 400/401 errors
- **Fix:** Check API key is correct
- **Fix:** Verify API key has contact write permissions
- **Fix:** Check property names match exactly (case-sensitive)

## Integration with HubSpot Tracking Code

The HubSpot embed code (already added to your page) will also track:
- Page views
- Form submissions (via HubSpot forms)
- User behavior
- Analytics data

**Both systems work together:**
- API integration: Explicit source tracking
- Tracking code: Automatic analytics

## Next Steps

1. ✅ Create custom properties in HubSpot
2. ✅ Test signup form
3. ✅ Verify data in HubSpot
4. ✅ Create reports/lists based on source
5. ✅ Set up workflows based on source

---

**Your contacts will now clearly show they came from your landing page!**

