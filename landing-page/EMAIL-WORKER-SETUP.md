# Email Worker Configuration Guide

## Overview

This guide shows how to configure the email worker to send automated email sequences to people who sign up on the landing page.

**Current Setup:**
- ✅ HubSpot: Saves contacts (CRM)
- ✅ SendGrid: Sends welcome email immediately
- ⏳ **Email Sequences: Not yet configured**

## Architecture

This landing page uses **SendGrid directly** for email sequences:

- **Email Sequence Service** - Schedules emails in HubSpot
- **Cron Job** - Processes scheduled emails hourly
- **SendGrid API** - Sends all emails (welcome + sequences)

**No external services needed** - everything runs in this project!

### Option 2: Create New Email Worker for Landing Page

**Best if:** You want a separate system for the landing page

Create a new email worker specifically for `foundersinfra.com` that:
- Uses SendGrid (already configured)
- Integrates with signup API
- Sends sequences on schedule

### Option 3: SendGrid Dynamic Templates

**Best if:** You want minimal code, maximum simplicity

Use SendGrid's built-in automation:
- Create email templates in SendGrid
- Set up automation workflows
- Trigger via API on signup

---

## Option 1: Use EasyFlow Email Worker (Recommended)

### Step 1: Expose EasyFlow API Endpoint

In your EasyFlow SaaS, create an API endpoint to enroll contacts in email sequences:

**File:** `rpa-system/backend/routes/emailSequenceRoutes.js` (or similar)

```javascript
// Add to your EasyFlow backend
router.post('/api/email-sequences/enroll', async (req, res) => {
  const { email, firstName, lastName, sequence } = req.body;
  
  // Validate
  if (!email || !sequence) {
    return res.status(400).json({ error: 'Email and sequence required' });
  }
  
  // Use your existing email worker
  const emailWorker = require('../workers/email_worker');
  
  // Enroll in sequence
  await emailWorker.enrollInSequence({
    email,
    firstName: firstName || '',
    lastName: lastName || '',
    sequence: sequence || 'foundersinfra-welcome', // Default sequence
  });
  
  res.json({ success: true, message: 'Enrolled in email sequence' });
});
```

### Step 2: Update Landing Page Signup API

Update `landing-page/pages/api/signup.js` to call EasyFlow:

```javascript
// After welcome email is sent successfully
if (emailSent) {
  // Enroll in EasyFlow email sequence
  const EASYFLOW_API_URL = process.env.EASYFLOW_API_URL || 'https://your-easyflow-domain.com';
  const EASYFLOW_API_KEY = process.env.EASYFLOW_API_KEY;
  
  if (EASYFLOW_API_KEY) {
    try {
      const response = await fetch(`${EASYFLOW_API_URL}/api/email-sequences/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${EASYFLOW_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          firstName: firstName || '',
          lastName: lastName || '',
          sequence: 'foundersinfra-welcome', // Your sequence name in EasyFlow
        }),
      });
      
      if (response.ok) {
        console.log('Enrolled in EasyFlow email sequence:', email);
      } else {
        console.error('Failed to enroll in EasyFlow sequence:', await response.text());
      }
    } catch (error) {
      console.error('EasyFlow enrollment error:', error);
      // Don't fail signup if sequence enrollment fails
    }
  }
}
```

### Step 2: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
HUBSPOT_API_KEY=your_hubspot_api_key
EASYFLOW_API_URL=https://your-easyflow-domain.com
EASYFLOW_API_KEY=your_easyflow_api_key
```

---

## Option 2: Create New Email Worker for Landing Page

If you want a simpler approach, you can trigger SendGrid sequences directly from the signup API:

### Update Signup API

```javascript
// After welcome email is sent
if (emailSent && SENDGRID_API_KEY) {
  // Option A: Use SendGrid Marketing Campaigns API
  // Option B: Schedule emails manually via SendGrid API
  // Option C: Use SendGrid dynamic templates with scheduled sends
  
  // For now, we'll just send the welcome email
  // Add sequence emails manually or via SendGrid automation
}
```

### Use SendGrid Automation

1. Go to SendGrid → Marketing → Automation
2. Create a new automation
3. Trigger: When contact is added to list
4. Add email sequence (Day 2, Day 5, Day 9, etc.)
5. Connect to your SendGrid contact list

---

## Option 3: SendGrid Dynamic Templates (Alternative)

---

## Recommended Approach

**Use Option 1 (EasyFlow Email Worker)** because:
- ✅ You already have the infrastructure (EasyFlow SaaS)
- ✅ SendGrid already configured
- ✅ Email worker already working
- ✅ Centralized email management
- ✅ Reuse existing sequences
- ✅ One system for all emails

---

## Next Steps

1. ✅ Choose your approach (Option 1 recommended)
2. ⏳ Create SendGrid email service
3. ⏳ Create email queue service
4. ⏳ Create cron job processor
5. ⏳ Update signup API to schedule sequences
6. ⏳ Configure Vercel cron job
7. ⏳ Test end-to-end flow

---

**Questions?** Your EasyFlow email worker is already set up and working. Just expose an API endpoint to enroll contacts in sequences, then call it from the landing page signup API.

