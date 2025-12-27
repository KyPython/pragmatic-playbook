# HubSpot AI Prompts to Create Custom Properties

Copy and paste these prompts into HubSpot's AI assistant (or use them when creating properties manually).

## Prompt 1: Create `scheduled_emails` Property

```
Create a custom contact property named "scheduled_emails" with the following settings:
- Property type: Single-line text
- Label: Scheduled Emails
- Description: JSON array of scheduled emails with dates and templates for automated email sequences
- Internal name: scheduled_emails
- Make it an internal property (not shown to users)
- Field type: Single-line text
```

## Prompt 2: Create `email_sequence` Property

```
Create a custom contact property named "email_sequence" with the following settings:
- Property type: Single-line text
- Label: Email Sequence
- Description: Name of the email sequence the contact is enrolled in (e.g., "foundersinfra-welcome")
- Internal name: email_sequence
- Make it an internal property (not shown to users)
- Field type: Single-line text
```

## Prompt 3: Create `sequence_start_date` Property

```
Create a custom contact property named "sequence_start_date" with the following settings:
- Property type: Date picker
- Label: Sequence Start Date
- Description: When the email sequence started for this contact
- Internal name: sequence_start_date
- Make it an internal property (not shown to users)
- Field type: Date picker
```

---

## Alternative: Single Combined Prompt

If HubSpot's AI supports creating multiple properties at once:

```
Create 3 custom contact properties for automated email sequences:

1. Property name: scheduled_emails
   - Type: Single-line text
   - Label: Scheduled Emails
   - Description: JSON array of scheduled emails with dates and templates
   - Internal: Yes

2. Property name: email_sequence
   - Type: Single-line text
   - Label: Email Sequence
   - Description: Name of the email sequence (e.g., "foundersinfra-welcome")
   - Internal: Yes

3. Property name: sequence_start_date
   - Type: Date picker
   - Label: Sequence Start Date
   - Description: When the email sequence started
   - Internal: Yes

Make all three properties internal (not shown to users).
```

---

## Manual Steps (If AI Doesn't Work)

If HubSpot's AI can't create properties, do it manually:

1. **Go to:** HubSpot → Settings → Properties → Contacts
2. **Click:** "Create property"
3. **For each property:**
   - Enter the property name (e.g., `scheduled_emails`)
   - Select the field type (Single-line text or Date picker)
   - Enter the label
   - Enter the description
   - Check "Internal property" (so users don't see it)
   - Save

---

## Verify Properties Were Created

After creating, verify they exist:

1. Go to HubSpot → Settings → Properties → Contacts
2. Search for each property name:
   - `scheduled_emails`
   - `email_sequence`
   - `sequence_start_date`
3. Make sure all 3 are listed

Then test the signup form again - the email sequence should schedule successfully!

