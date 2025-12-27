# Send First Email Sequence - Quick Guide

## 🚀 Quick Start (2 Minutes)

### Step 1: Configure HubSpot

```bash
cd email-sender
cp .env.example .env
```

Edit `.env` and add your HubSpot API key:
```
HUBSPOT_API_KEY=your_actual_api_key_here
```

### Step 2: Create Contacts File

Create `contacts.txt` with interested emails (one per line):

```bash
cat > contacts.txt << EOF
founder1@startup.com
founder2@startup.com
cto@company.com
EOF
```

### Step 3: Send!

```bash
node quick-send.js --file contacts.txt
```

That's it! Contacts are added to HubSpot and enrolled in the email sequence.

## 📧 What Happens

1. **Contacts are added to HubSpot** (or updated if they exist)
2. **If workflow is configured:** Contacts are enrolled in automated sequence
3. **HubSpot sends emails automatically:**
   - Day 0: Welcome email
   - Day 7: Week 1 check-in
   - Day 21: Mid-course motivation
   - Day 42: Production week
   - Day 56: Completion

## ⚙️ Set Up HubSpot Workflow (Recommended)

For automated email sequences, set up a workflow in HubSpot:

1. **Go to HubSpot** → Automation → Workflows
2. **Create workflow** → Contact-based
3. **Add emails** from `emails/01-course-launch-sequence.md`
4. **Set delays** (Day 0, Day 7, Day 21, etc.)
5. **Copy workflow ID** to `.env` as `HUBSPOT_WORKFLOW_ID`

See `email-sender/setup-workflow.md` for detailed instructions.

## 🎯 Alternative: Manual Sending

If you don't want to set up workflows yet:

1. **Add contacts to HubSpot:**
   ```bash
   node quick-send.js founder@startup.com
   ```

2. **Send emails manually from HubSpot:**
   - Go to Marketing → Email
   - Create email from template
   - Use content from `emails/01-course-launch-sequence.md`
   - Send to contacts

## 📝 Email Sequences Available

1. **Course Launch** (`emails/01-course-launch-sequence.md`)
   - 5 emails over 56 days
   - Welcome, check-ins, completion

2. **Consulting Outreach** (`emails/02-consulting-outreach.md`)
   - 3 emails for lead generation

3. **Nurture** (`emails/03-nurture-sequence.md`)
   - Ongoing educational content

## ✅ Test First

Always test with your own email:

```bash
node quick-send.js your@email.com
```

Check HubSpot to verify:
- ✅ Contact was created
- ✅ Workflow enrollment (if configured)
- ✅ First email sent

## 🎉 You're Ready!

Once configured, sending to interested contacts is as simple as:

```bash
node quick-send.js interested@example.com
```

Or send to multiple:

```bash
node quick-send.js --file contacts.txt
```

## Need Help?

- See `email-sender/README.md` for full documentation
- See `email-sender/setup-workflow.md` for workflow setup
- See `email-sender/QUICK-START.md` for quick reference

