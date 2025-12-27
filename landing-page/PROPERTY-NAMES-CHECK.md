# HubSpot Property Names - Exact Requirements

## Required Properties (Check Internal Names)

The code uses these **exact internal names** (case-sensitive):

### ✅ Property 1: `scheduled_emails`
- **Internal name:** `scheduled_emails` ✅
- **Type:** Single-line text ✅
- **Status:** Correct!

### ✅ Property 2: `email_sequence`
- **Internal name:** `email_sequence` ✅
- **Type:** Single-line text ✅
- **Status:** Correct!

### ⚠️ Property 3: `sequence_start_date`
- **Internal name:** Must be exactly `sequence_start_date`
- **Type:** Date picker (NOT "Date/time")
- **Status:** Need to verify internal name

## Check "Email Sequence Start Date" Property

1. **Click on "Email Sequence Start Date"** in HubSpot
2. **Check the "Internal name" field**
3. **It must be exactly:** `sequence_start_date`

**If the internal name is different** (e.g., `email_sequence_start_date` or `sequenceStartDate`):
- Either rename it to `sequence_start_date`
- Or delete and recreate with the exact internal name

## Remove Duplicate Property

I see you also have **"Email Sequence Started"** - this might be a duplicate. You only need:
- `email_sequence` (Single-line text)
- `sequence_start_date` (Date picker)

You can delete "Email Sequence Started" if it's not being used.

## Quick Verification

After verifying all 3 properties have the correct internal names:
1. Test signup form again
2. Check logs for: "Email sequence scheduled: 5 emails"
3. If error persists, the logs will show which property is failing

---

**The internal names must match EXACTLY (case-sensitive, underscores, no spaces).**

