# Quick Start: Send First Email Sequence

## Option 1: Quick Send (Simplest)

Send welcome email to interested contacts:

```bash
# Single contact
node quick-send.js founder@startup.com

# Multiple contacts
node quick-send.js founder1@startup.com founder2@startup.com

# From file
echo "founder@startup.com" > contacts.txt
node quick-send.js --file contacts.txt
```

This will:
1. Add contacts to HubSpot
2. Enroll them in workflow (if configured)
3. HubSpot sends emails automatically

## Option 2: Full Email Sender

For more control:

```bash
# Send course launch sequence
npm run send:launch founder@startup.com

# Send consulting outreach
npm run send:consulting founder@startup.com

# Send nurture sequence
npm run send:nurture founder@startup.com
```

## Setup (One Time)

1. **Get HubSpot API Key:**
   - HubSpot → Settings → Integrations → API key
   - Copy your key

2. **Configure:**
   ```bash
   cp .env.example .env
   # Edit .env and add: HUBSPOT_API_KEY=your_key
   ```

3. **Set Up Workflow (Recommended):**
   - See `setup-workflow.md` for detailed instructions
   - Creates automated email sequence
   - Copy workflow ID to `.env`

4. **Send:**
   ```bash
   node quick-send.js interested@example.com
   ```

## What Happens

1. Contact is added to HubSpot
2. If workflow is set up, contact is enrolled
3. HubSpot sends emails automatically based on schedule:
   - Day 0: Welcome email
   - Day 7: Week 1 check-in
   - Day 21: Mid-course motivation
   - Day 42: Production week
   - Day 56: Completion

## Test First

Always test with your own email:

```bash
node quick-send.js your@email.com
```

Check HubSpot to verify:
- Contact was created
- Workflow enrollment succeeded
- First email was sent

## Need Help?

- See `README.md` for full documentation
- See `setup-workflow.md` for workflow setup
- Check HubSpot dashboard for contact status

