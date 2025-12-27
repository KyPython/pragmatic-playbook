# Verify HubSpot Custom Properties

## Quick Check

1. **Go to HubSpot** → Settings → Properties → Contacts
2. **Search for each property** (use the search bar):
   - `scheduled_emails`
   - `email_sequence`
   - `sequence_start_date`

## Property Requirements

### Property 1: `scheduled_emails`
- **Internal Name:** Must be exactly `scheduled_emails` (lowercase, underscore)
- **Type:** Single-line text
- **Label:** Can be anything (e.g., "Scheduled Emails")
- **Internal:** Yes (not shown to users)

### Property 2: `email_sequence`
- **Internal Name:** Must be exactly `email_sequence` (lowercase, underscore)
- **Type:** Single-line text
- **Label:** Can be anything (e.g., "Email Sequence")
- **Internal:** Yes

### Property 3: `sequence_start_date`
- **Internal Name:** Must be exactly `sequence_start_date` (lowercase, underscores)
- **Type:** Date picker (NOT date/time, just date picker)
- **Label:** Can be anything (e.g., "Sequence Start Date")
- **Internal:** Yes

## Common Issues

### Issue: "Property values were not valid"

**Possible causes:**
1. **Wrong internal name** - Check the internal name matches exactly (case-sensitive)
2. **Wrong property type** - `sequence_start_date` must be "Date picker", not "Date/time" or "Number"
3. **Property not created** - Property doesn't exist yet

**How to check internal name:**
1. Go to HubSpot → Settings → Properties → Contacts
2. Click on the property
3. Look at "Internal property name" - must match exactly:
   - `scheduled_emails` (not `Scheduled_Emails` or `scheduledEmails`)
   - `email_sequence` (not `Email_Sequence` or `emailSequence`)
   - `sequence_start_date` (not `Sequence_Start_Date` or `sequenceStartDate`)

### Issue: Properties exist but still getting error

**Try this:**
1. **Delete and recreate** the properties with exact names
2. **Wait 1-2 minutes** for HubSpot to sync
3. **Test signup again**

### Issue: Date format error

The code uses milliseconds timestamp for date picker properties. If you see date-related errors:
- Make sure `sequence_start_date` is type "Date picker" (not "Date/time")
- The code automatically converts dates to milliseconds

## Test After Creating Properties

1. **Sign up** on your landing page
2. **Check logs** - Should see: "Email sequence scheduled: 5 emails"
3. **Check HubSpot contact** - Properties should be populated

---

**If you still get errors after verifying property names, the properties might need to be recreated with exact internal names.**

