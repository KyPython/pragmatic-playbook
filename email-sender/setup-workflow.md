# Setting Up HubSpot Email Workflows

This guide walks you through setting up automated email sequences in HubSpot.

## Step 1: Create Workflow

1. Log in to HubSpot
2. Go to **Automation** → **Workflows**
3. Click **Create workflow**
4. Choose **Contact-based workflow**

## Step 2: Set Trigger

1. Click **Set up trigger**
2. Choose **Contact enrolled in workflow**
3. Save

## Step 3: Add Email Actions

For the **Course Launch Sequence** (5 emails over 56 days):

### Email 1: Welcome (Day 0)
1. Click **+ Add action** → **Send email**
2. Choose **Create new email** or use template
3. Subject: `Welcome to The Founder's Infrastructure Playbook`
4. Copy content from `emails/01-course-launch-sequence.md` (Email 1)
5. Set delay: **0 days**

### Email 2: Week 1 Check-in (Day 7)
1. Add another **Send email** action
2. Subject: `How's Project 1 going?`
3. Copy content from Email 2
4. Set delay: **7 days after previous email**

### Email 3: Mid-Course (Day 21)
1. Add **Send email** action
2. Subject: `You're halfway there!`
3. Copy content from Email 3
4. Set delay: **14 days after previous email**

### Email 4: Production Week (Day 42)
1. Add **Send email** action
2. Subject: `You're ready for production!`
3. Copy content from Email 4
4. Set delay: **21 days after previous email**

### Email 5: Completion (Day 56)
1. Add **Send email** action
2. Subject: `Congratulations! What's next?`
3. Copy content from Email 5
4. Set delay: **14 days after previous email**

## Step 4: Get Workflow ID

1. After creating workflow, go to workflow settings
2. Look for **Workflow ID** in URL or settings
3. Copy to `.env` file as `HUBSPOT_WORKFLOW_ID`

## Step 5: Activate Workflow

1. Click **Review and publish**
2. Activate workflow
3. Test by enrolling your own email

## Step 6: Enroll Contacts

Use the email sender to enroll contacts:

```bash
node send-emails.js launch user@example.com
```

Or enroll multiple:

```bash
node send-emails.js launch --file contacts.txt
```

## Alternative: Use HubSpot Email Sequences

HubSpot also has built-in email sequences:

1. Go to **Marketing** → **Email** → **Sequences**
2. Create new sequence
3. Add emails with delays
4. Enroll contacts manually or via API

## Tips

- **Test first**: Always enroll your own email to test
- **Personalization**: Use HubSpot tokens like `{{contact.firstname}}`
- **A/B testing**: Test different subject lines
- **Analytics**: Track opens, clicks, and unsubscribes
- **Compliance**: Include unsubscribe links (HubSpot adds automatically)

## Quick Start Script

```bash
# 1. Set up .env
cp .env.example .env
# Edit .env and add HUBSPOT_API_KEY

# 2. Create contacts file
echo "interested@example.com" > contacts.txt

# 3. Send sequence
node send-emails.js launch --file contacts.txt
```

HubSpot will automatically send emails based on the workflow schedule!

