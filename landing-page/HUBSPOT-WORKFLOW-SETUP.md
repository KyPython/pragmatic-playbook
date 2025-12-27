# HubSpot Workflow Setup Guide

## Overview

This landing page uses **HubSpot workflows** to automatically send email sequences when contacts sign up. No cron jobs, no custom code - just HubSpot's visual workflow builder!

## What You Need

- ✅ HubSpot Marketing Hub Starter (you already have this!)
- ✅ 2,000 emails/month included
- ✅ Visual workflow builder

## Setup Steps

### Step 1: Create Email Templates in HubSpot

1. **Go to HubSpot:** Marketing → Email → Templates
2. **Create 6 email templates** (or use existing ones):

   #### Template 1: Welcome Email
   - **Name:** "Welcome - Founder's Infrastructure Playbook"
   - **Subject:** "Welcome to The Founder's Infrastructure Playbook"
   - **Content:** Welcome message with course overview

   #### Template 2: Day 2 Follow-up
   - **Name:** "Day 2 - Technical Debt Problem"
   - **Subject:** "The $50K Technical Debt Problem"
   - **Content:** Pain point email about technical debt

   #### Template 3: Day 5 Follow-up
   - **Name:** "Day 5 - Recover Lost Velocity"
   - **Subject:** "How to Recover Lost Velocity"
   - **Content:** ROI and value proposition

   #### Template 4: Day 9 Follow-up
   - **Name:** "Day 9 - Real Results"
   - **Subject:** "Real Results from Infrastructure Consulting"
   - **Content:** Social proof and case studies

   #### Template 5: Day 13 Follow-up
   - **Name:** "Day 13 - Final Push"
   - **Subject:** "Ready to Recover $50K+ in Lost Velocity?"
   - **Content:** Services overview and CTA

   #### Template 6: Day 20 Follow-up
   - **Name:** "Day 20 - Follow-up"
   - **Subject:** "Following up on infrastructure consulting"
   - **Content:** Gentle follow-up

### Step 2: Create Workflow

1. **Go to HubSpot:** Automation → Workflows
2. **Click "Create workflow"**
3. **Choose:** "Contact-based workflow"
4. **Name it:** "Founder's Infrastructure Playbook - Email Sequence"

### Step 3: Set Workflow Trigger

1. **Add trigger:** "Contact property value changes"
2. **Select property:** `lifecyclestage`
3. **Set condition:** `lifecyclestage` equals `subscriber`
4. **Optional:** Add filter for `email` is not empty

### Step 4: Add Email Actions

Add these actions in order:

#### Action 1: Send Welcome Email (Immediate)
- **Action type:** "Send marketing email"
- **Email template:** "Welcome - Founder's Infrastructure Playbook"
- **Send immediately** (no delay)

#### Action 2: Send Day 2 Email
- **Action type:** "Send marketing email"
- **Email template:** "Day 2 - Technical Debt Problem"
- **Delay:** 2 days after enrollment

#### Action 3: Send Day 5 Email
- **Action type:** "Send marketing email"
- **Email template:** "Day 5 - Recover Lost Velocity"
- **Delay:** 5 days after enrollment

#### Action 4: Send Day 9 Email
- **Action type:** "Send marketing email"
- **Email template:** "Day 9 - Real Results"
- **Delay:** 9 days after enrollment

#### Action 5: Send Day 13 Email
- **Action type:** "Send marketing email"
- **Email template:** "Day 13 - Final Push"
- **Delay:** 13 days after enrollment

#### Action 6: Send Day 20 Email
- **Action type:** "Send marketing email"
- **Email template:** "Day 20 - Follow-up"
- **Delay:** 20 days after enrollment

### Step 5: Add Exit Criteria (Optional)

To prevent contacts from receiving emails if they unsubscribe:

1. **Add exit criteria:** "Contact unsubscribed from all marketing emails"
2. **Action:** Remove from workflow

### Step 6: Activate Workflow

1. **Click "Review and activate"**
2. **Review settings**
3. **Click "Activate"**

## How It Works

1. **User signs up** on landing page
2. **API creates contact** in HubSpot with `lifecyclestage = 'subscriber'`
3. **HubSpot workflow triggers** automatically
4. **Emails send** according to the schedule you set

## Testing

1. **Sign up** with a test email on your landing page
2. **Check HubSpot:** Contacts → Find your test contact
3. **Verify:** Contact has `lifecyclestage = 'subscriber'`
4. **Check workflow:** Automation → Workflows → Your workflow → "Enrolled contacts"
5. **Wait for emails:** Check your inbox at the scheduled times

## Troubleshooting

### Emails Not Sending

1. **Check workflow is active:** Automation → Workflows → Your workflow
2. **Check contact enrollment:** Workflow → "Enrolled contacts" tab
3. **Check email limits:** Marketing → Email → Check remaining sends
4. **Check email domain:** Settings → Marketing → Email → Sending domains (must be verified)

### Contact Not Enrolling

1. **Check contact property:** Verify `lifecyclestage = 'subscriber'` in HubSpot
2. **Check trigger:** Workflow → Trigger → Verify condition matches
3. **Check filters:** Workflow → Filters → Ensure no filters are blocking

### Email Templates Not Found

1. **Verify templates exist:** Marketing → Email → Templates
2. **Check template names:** Must match exactly what you used in workflow
3. **Check template status:** Templates must be published/active

## Benefits of HubSpot Workflows

✅ **Visual builder** - No code needed  
✅ **Automatic** - No cron jobs or custom code  
✅ **Integrated** - Everything in HubSpot  
✅ **Trackable** - See opens, clicks, engagement  
✅ **Flexible** - Easy to update email content or timing  

## Next Steps

1. ✅ Create email templates
2. ✅ Create workflow
3. ✅ Test with a real signup
4. ✅ Monitor email performance in HubSpot

---

**That's it!** Your email sequences will now run automatically via HubSpot workflows. No SendGrid, no cron jobs, no custom code needed.

