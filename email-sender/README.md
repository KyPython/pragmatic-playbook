# Email Sender - HubSpot Integration

Send email sequences to contacts via HubSpot. Supports automated workflows and manual sending.

## Setup

### 1. Get HubSpot API Key

1. Log in to HubSpot
2. Go to **Settings** → **Integrations** → **API key**
3. Copy your API key

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add:
HUBSPOT_API_KEY=your_api_key_here
HUBSPOT_WORKFLOW_ID=your_workflow_id_here  # Optional, for automated sequences
```

### 3. Install Dependencies

```bash
npm install
```

## Usage

### Send to Single Contact

```bash
# Send course launch sequence
npm run send:launch user@example.com

# Send consulting outreach
npm run send:consulting user@example.com

# Send nurture sequence
npm run send:nurture user@example.com
```

### Send to Multiple Contacts

Create a file `contacts.txt` with one email per line:
```
user1@example.com
user2@example.com
user3@example.com
```

Then:
```bash
node send-emails.js launch --file contacts.txt
```

## HubSpot Workflows (Recommended)

For automated email sequences, set up workflows in HubSpot:

### Setup Workflow

1. Go to **Automation** → **Workflows**
2. Create new workflow
3. Add trigger: "Contact enrolled in workflow"
4. Add delays between emails (Day 0, Day 3, Day 7, etc.)
5. Add email actions with your email content
6. Copy workflow ID to `.env` as `HUBSPOT_WORKFLOW_ID`

### Enroll Contacts

```bash
# This will enroll contacts in the workflow
# HubSpot will send emails automatically based on schedule
node send-emails.js launch user@example.com
```

## Email Sequences Available

1. **Course Launch** (`01-course-launch-sequence.md`)
   - 5 emails over 56 days
   - Welcome, check-ins, completion

2. **Consulting Outreach** (`02-consulting-outreach.md`)
   - 3 emails for lead generation
   - Problem-focused, value-first

3. **Nurture Sequence** (`03-nurture-sequence.md`)
   - Ongoing educational content
   - Technical debt calculator, deployment guides

## Manual Sending vs Workflows

### Manual Sending
- Sends first email immediately
- You control timing
- Good for testing

### HubSpot Workflows (Recommended)
- Automated sequences
- Scheduled delays
- Better deliverability
- Analytics and tracking

## Example: Send First Email Sequence

```bash
# 1. Create contacts.txt with interested emails
echo "founder1@startup.com" > contacts.txt
echo "founder2@startup.com" >> contacts.txt

# 2. Send course launch sequence
node send-emails.js launch --file contacts.txt

# 3. Check HubSpot to see contacts added
```

## Troubleshooting

### "HubSpot API key not configured"
- Check `.env` file exists
- Verify `HUBSPOT_API_KEY` is set
- Restart after changing `.env`

### "Workflow not found"
- Create workflow in HubSpot first
- Copy workflow ID to `.env`
- Or remove `HUBSPOT_WORKFLOW_ID` to send manually

### Email Not Sending
- Check HubSpot API permissions
- Verify contact email is valid
- Check HubSpot rate limits

## Next Steps

1. **Set up HubSpot workflows** for automated sequences
2. **Create email templates** in HubSpot
3. **Test with your email** first
4. **Track opens and clicks** in HubSpot
5. **A/B test subject lines** for better open rates

