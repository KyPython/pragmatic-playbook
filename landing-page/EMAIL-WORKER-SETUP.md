# Email Worker Configuration Guide

## Overview

This guide shows how to configure the email worker to send automated email sequences to people who sign up on the landing page.

**Current Setup:**
- ✅ HubSpot: Saves contacts (CRM)
- ✅ SendGrid: Sends welcome email immediately
- ⏳ **Email Sequences: Not yet configured**

## Architecture Options

You have three options for email sequences:

### Option 1: Use DevOps Productivity Suite Email Worker (Recommended)

**Best if:** You want to leverage your existing infrastructure

The DevOps Productivity Suite (`/Users/ky/devops-productivity-suite-site`) already has:
- Email queue service
- Scheduled email storage
- Cron job processor
- HubSpot integration

**Adaptation needed:** Switch from Resend to SendGrid

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

## Option 1: Adapt DevOps Suite Email Worker (Recommended)

### Step 1: Create SendGrid Email Service

Create `landing-page/pages/api/services/sendgrid-service.js`:

```javascript
const sgMail = require('@sendgrid/mail');

class SendGridService {
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'founders@foundersinfra.com';
    this.fromName = process.env.SENDGRID_FROM_NAME || 'Founders Infrastructure';
    
    if (this.apiKey) {
      sgMail.setApiKey(this.apiKey);
    }
  }

  async sendEmail({ to, subject, html, text }) {
    if (!this.apiKey) {
      console.warn('SendGrid API key not configured');
      return { success: false, error: 'SendGrid not configured' };
    }

    try {
      const result = await sgMail.send({
        to,
        from: {
          email: this.fromEmail,
          name: this.fromName,
        },
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      });

      console.log('Email sent via SendGrid', { to, subject, messageId: result[0]?.headers['x-message-id'] });
      return { success: true, messageId: result[0]?.headers['x-message-id'] };
    } catch (error) {
      console.error('SendGrid error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new SendGridService();
```

### Step 2: Create Email Queue Service

Create `landing-page/pages/api/services/email-queue.js`:

```javascript
const sendGridService = require('./sendgrid-service');
const hubspotService = require('./hubspot-service'); // You'll need to create this

class EmailQueueService {
  /**
   * Schedule email sequence for a new signup
   */
  async scheduleSequence(email, firstName) {
    const sequence = [
      { delay: 0, subject: 'Welcome to The Founder\'s Infrastructure Playbook', template: 'welcome' },
      { delay: 2, subject: 'The $50K Technical Debt Problem', template: 'pain-point' }, // 2 days
      { delay: 5, subject: 'How to Recover Lost Velocity', template: 'roi' }, // 5 days
      { delay: 9, subject: 'Real Results from Infrastructure Consulting', template: 'social-proof' }, // 9 days
      { delay: 13, subject: 'Ready to Recover $50K+ in Lost Velocity?', template: 'final-push' }, // 13 days
      { delay: 20, subject: 'Following up on infrastructure consulting', template: 'follow-up' }, // 20 days
    ];

    for (const emailConfig of sequence) {
      const scheduledFor = new Date();
      scheduledFor.setDate(scheduledFor.getDate() + emailConfig.delay);

      // Store in HubSpot custom property or use a simple storage solution
      await this.scheduleEmail(email, firstName, emailConfig, scheduledFor);
    }
  }

  async scheduleEmail(email, firstName, config, scheduledFor) {
    // Store scheduled email (options below)
    // Option A: HubSpot custom property (simple)
    // Option B: Database (more robust)
    // Option C: SendGrid scheduled send (if supported)
    
    // For now, we'll use HubSpot to track scheduled emails
    await hubspotService.addScheduledEmail(email, {
      subject: config.subject,
      template: config.template,
      scheduledFor: scheduledFor.toISOString(),
    });
  }
}

module.exports = new EmailQueueService();
```

### Step 3: Create Cron Job to Process Queue

Create `landing-page/pages/api/cron/process-email-queue.js`:

```javascript
const sendGridService = require('../services/sendgrid-service');
const hubspotService = require('../services/hubspot-service');
const emailTemplates = require('../services/email-templates');

export default async function handler(req, res) {
  // Verify cron secret
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get contacts with due emails from HubSpot
    const contactsWithDueEmails = await hubspotService.getContactsWithDueEmails();

    let sent = 0;
    let failed = 0;

    for (const contact of contactsWithDueEmails) {
      try {
        // Check if they've replied or unsubscribed
        if (await hubspotService.hasReplied(contact.email)) {
          continue; // Skip if they've engaged
        }

        // Get email template
        const email = emailTemplates.getTemplate(contact.scheduledEmail.template, contact.firstName);
        
        // Send email
        await sendGridService.sendEmail({
          to: contact.email,
          subject: contact.scheduledEmail.subject,
          html: email.html,
          text: email.text,
        });

        // Mark as sent
        await hubspotService.markEmailSent(contact.email, contact.scheduledEmail.id);
        sent++;
      } catch (error) {
        console.error('Failed to send email:', error);
        failed++;
      }
    }

    return res.json({
      success: true,
      sent,
      failed,
      total: contactsWithDueEmails.length,
    });
  } catch (error) {
    console.error('Email queue processing error:', error);
    return res.status(500).json({ error: 'Failed to process queue' });
  }
}
```

### Step 4: Update Signup API to Schedule Sequence

Update `landing-page/pages/api/signup.js`:

```javascript
// Add after welcome email is sent
const emailQueueService = require('./services/email-queue');

// ... existing code ...

// After welcome email is sent successfully
if (emailSent) {
  // Schedule email sequence
  try {
    await emailQueueService.scheduleSequence(email, firstName || 'there');
    console.log('Email sequence scheduled for', email);
  } catch (error) {
    console.error('Failed to schedule email sequence:', error);
    // Don't fail signup if sequence scheduling fails
  }
}
```

### Step 5: Configure Vercel Cron Job

Update `landing-page/vercel.json`:

```json
{
  "version": 2,
  "crons": [
    {
      "path": "/api/cron/process-email-queue",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Step 6: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
HUBSPOT_API_KEY=your_hubspot_api_key
CRON_SECRET=your_random_secret_here
```

---

## Option 2: Simple SendGrid Integration (Quick Start)

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

## Option 3: Use Your SaaS Email Worker

If your SaaS (`useeasyflow.com`) already has an email worker:

1. **Expose an API endpoint** in your SaaS to add contacts to email sequences
2. **Call it from the landing page signup API:**
   ```javascript
   await fetch('https://your-saas.com/api/email-sequences/enroll', {
     method: 'POST',
     headers: { 'Authorization': `Bearer ${SAAS_API_KEY}` },
     body: JSON.stringify({ email, firstName, sequence: 'foundersinfra-welcome' }),
   });
   ```

---

## Recommended Approach

**For now:** Use **Option 1** (adapt DevOps Suite pattern) because:
- ✅ You already have the infrastructure
- ✅ Proven pattern (works in DevOps Suite)
- ✅ Full control over timing and content
- ✅ Easy to customize sequences

**Later:** Consider **Option 3** (use SaaS email worker) if:
- You want centralized email management
- You want to reuse existing sequences
- You want one system for all emails

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

**Questions?** The DevOps Productivity Suite has a working example you can reference at `/Users/ky/devops-productivity-suite-site/api/services/email-queue.ts`

