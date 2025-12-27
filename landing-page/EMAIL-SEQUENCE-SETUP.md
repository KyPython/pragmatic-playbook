# Email Sequence Setup Guide

## ✅ What's Fixed

1. **Automatic Enrollment**: Signup API now enrolls contacts in HubSpot workflows
2. **Styled Emails**: HTML email templates match your blue landing page
3. **Brand Colors**: All purple changed to blue (#3b82f6)

## Setup Steps

### Step 1: Create HubSpot Workflow

1. Go to HubSpot → **Automation** → **Workflows**
2. Click **Create workflow** → **Contact-based workflow**
3. Set trigger: **Contact enrolled in workflow**
4. Add email actions with delays:
   - Email 1: Welcome (Day 0)
   - Email 2: Week 1 Check-in (Day 7)
   - Email 3: Mid-Course (Day 21)
   - Email 4: Production Week (Day 42)
   - Email 5: Completion (Day 56)
5. Copy content from `emails/01-course-launch-sequence.md` OR use HTML templates from `email-templates/`
6. **Get Workflow ID**: Look in URL or workflow settings
   - Example: `https://app.hubspot.com/workflows/12345678` → ID is `12345678`

### Step 2: Add Workflow ID to Vercel

1. Go to Vercel → Your Project → **Settings** → **Environment Variables**
2. Add new variable:
   - **Name**: `HUBSPOT_WORKFLOW_ID`
   - **Value**: Your workflow ID (e.g., `12345678`)
3. **Redeploy** your site

### Step 3: Use HTML Email Templates (Optional but Recommended)

1. Go to HubSpot → **Marketing** → **Email**
2. Create new email
3. Switch to **HTML editor**
4. Copy HTML from `email-templates/01-welcome-email.html`
5. Replace `{{first_name}}` with HubSpot token: `{{contact.firstname}}`
6. Replace `{{your_name}}` with your actual name
7. Save as template
8. Use in workflow

## How It Works Now

### When Someone Signs Up:

1. ✅ Contact is created/updated in HubSpot
2. ✅ Source tracking is set (landing page, URL, etc.)
3. ✅ **Contact is automatically enrolled in workflow** (if `HUBSPOT_WORKFLOW_ID` is set)
4. ✅ HubSpot sends emails automatically based on schedule

### Email Styling

- **Blue theme** matches landing page
- **Gradient header**: Blue (#3b82f6 to #1e40af)
- **Mobile responsive**
- **Professional look**

## Testing

1. **Test Signup:**
   ```bash
   # Sign up on your landing page with test email
   ```

2. **Check HubSpot:**
   - Go to Contacts
   - Find your test contact
   - Verify workflow enrollment (should show in contact timeline)
   - Check that first email was sent

3. **Test Email:**
   - Send test email from HubSpot
   - Check on mobile and desktop
   - Verify links work

## Troubleshooting

### Contacts Not Enrolling

- **Check**: Is `HUBSPOT_WORKFLOW_ID` set in Vercel?
- **Check**: Is workflow active in HubSpot?
- **Check**: Vercel logs for enrollment errors

### Emails Not Sending

- **Check**: Is workflow active?
- **Check**: Are email actions configured?
- **Check**: Are delays set correctly?

### Styling Issues

- **Use HTML templates**: Copy from `email-templates/`
- **Test in multiple clients**: Gmail, Outlook, Apple Mail
- **Check mobile**: Use responsive design

## Next Steps

1. ✅ Set up workflow in HubSpot
2. ✅ Add `HUBSPOT_WORKFLOW_ID` to Vercel
3. ✅ Create HTML emails from templates
4. ✅ Test with your own email
5. ✅ Deploy and go live!

---

**Your email sequences are now fully automated and styled! 🎉**

