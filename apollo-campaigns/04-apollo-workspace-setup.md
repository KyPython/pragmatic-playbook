# Apollo Workspace Setup Guide

Complete step-by-step guide to set up Apollo and launch your first cold email campaign.

## Step 1: Create Apollo Account (10 minutes)

1. **Sign up:**
   - Go to [apollo.io](https://www.apollo.io)
   - Click "Sign Up" or "Start Free Trial"
   - Use your business email (or founders@foundersinfra.com)

2. **Choose plan:**
   - Start with **Free plan** (50 credits/month) for testing
   - Or **Basic plan** ($49/month) for 200 credits/month
   - You can upgrade later

3. **Verify email:**
   - Check your inbox for verification email
   - Click verification link

## Step 2: Create Workspace (5 minutes)

1. **Set up workspace:**
   - Go to Settings → Workspace
   - Workspace name: "Founders Infrastructure Consulting"
   - Timezone: Your timezone
   - Save

2. **Configure sender email:**
   - Go to Settings → Email → Sending Domains
   - Add `foundersinfra.com` domain
   - Follow DNS setup instructions:
     - Add SPF record: `v=spf1 include:_spf.apollo.io ~all`
     - Add DKIM record (provided by Apollo)
     - Add DMARC record: `v=DMARC1; p=none; rua=mailto:dmarc@foundersinfra.com`
   - Verify domain (takes 5-10 minutes)

3. **Set up email address:**
   - Go to Settings → Email → Email Addresses
   - Add: `founders@foundersinfra.com`
   - Verify ownership
   - Set as default sender

## Step 3: Import ICP List (20 minutes)

### Option A: Create List in Apollo (Recommended)

1. **Go to Lists:**
   - Click "Lists" in sidebar
   - Click "Create List"

2. **List Name:**
   - "Seed-Series A CTOs - Velocity Wall"

3. **Apply Filters:**
   ```
   Title: CTO, VP Engineering, Head of Engineering
   Company Size: 11-50 employees
   Industry: Software, Internet, Computer Software
   Funding: Seed ($500K-$2M) OR Series A ($2M-$10M)
   Location: United States
   Technology: Node.js OR Python OR AWS OR GitHub
   Company Age: 2-5 years
   ```

4. **Save List:**
   - Review list size (target: 300-800 contacts)
   - Click "Save List"

### Option B: Import CSV (If you have a list)

1. **Prepare CSV:**
   - Columns: First Name, Last Name, Email, Company, Title
   - Save as `apollo-import.csv`

2. **Import:**
   - Go to Lists → Import
   - Upload CSV
   - Map columns
   - Import

3. **Enrich Data:**
   - Apollo will auto-enrich with company data
   - Wait for enrichment to complete

## Step 4: Set Up Email Sequences (20 minutes)

### Sequence 1: Consulting Outreach

1. **Create Sequence:**
   - Go to Sequences → Create Sequence
   - Name: "Consulting Outreach - Seed/Series A CTOs"

2. **Add Email 1:**
   - Subject: `Quick question about {{company.name}}'s deployment speed`
   - Body: (Copy from `02-email-sequences.md` - Email 1)
   - Delay: Day 0
   - Personalization: {{first_name}}, {{company.name}}, {{funding_round}}

3. **Add Email 2:**
   - Subject: `Re: {{company.name}}'s deployment speed`
   - Body: (Copy from `02-email-sequences.md` - Email 2)
   - Delay: Day 3 (if no reply)
   - Personalization: {{first_name}}, {{company.name}}

4. **Add Email 3:**
   - Subject: `$1,500 audit - Find $50K in hidden costs`
   - Body: (Copy from `02-email-sequences.md` - Email 3)
   - Delay: Day 7 (if no reply)
   - Personalization: {{first_name}}

5. **Set Automation Rules:**
   - If reply → Remove from sequence, tag as "Responded"
   - If books call → Tag as "Qualified Lead"
   - If says "not interested" → Remove and tag
   - If bounce → Remove

6. **Save Sequence**

## Step 5: Configure Tracking (5 minutes)

1. **Enable Tracking:**
   - Go to Settings → Email → Tracking
   - Enable: Open tracking, Click tracking, Reply tracking
   - Save

2. **Set Up Dashboard:**
   - Go to Dashboard
   - Add widgets:
     - Emails sent
     - Open rate
     - Reply rate
     - Click rate
     - Qualified leads

## Step 6: Test Sequence (10 minutes)

1. **Add Test Contact:**
   - Add your own email to the list
   - Enroll in sequence

2. **Verify:**
   - Check email arrives
   - Verify personalization works
   - Check tracking pixels load
   - Test reply handling

3. **Remove Test Contact:**
   - Remove yourself from sequence
   - Clean up test data

## Step 7: Launch Campaign (5 minutes)

1. **Select List:**
   - Go to your ICP list
   - Select all contacts (or first 50 for testing)

2. **Assign Sequence:**
   - Click "Add to Sequence"
   - Select "Consulting Outreach - Seed/Series A CTOs"
   - Click "Add"

3. **Review:**
   - Check number of contacts
   - Verify sequence is correct
   - Confirm sender email: founders@foundersinfra.com

4. **Launch:**
   - Click "Start Sequence"
   - Confirm launch

## Step 8: Monitor & Track (Ongoing)

1. **Daily Check:**
   - Open Apollo dashboard
   - Check:
     - Emails sent
     - Open rate
     - Reply rate
     - Bounce rate

2. **Track Responses:**
   - Use tracking spreadsheet (see `05-email-tracking-template.md`)
   - Log all replies
   - Tag qualified leads
   - Follow up on interested contacts

3. **Optimize:**
   - After 50 emails, review:
     - Which subject lines perform best?
     - Which emails get most replies?
     - What time of day works best?
   - Adjust sequences based on data

## Quick Start Checklist

- [ ] Apollo account created
- [ ] Workspace configured
- [ ] Domain verified (foundersinfra.com)
- [ ] Sender email set (founders@foundersinfra.com)
- [ ] ICP list created (300-800 contacts)
- [ ] Email sequence created (3 emails)
- [ ] Test email sent and verified
- [ ] First 30-50 contacts selected
- [ ] Sequence launched
- [ ] Tracking dashboard set up

## Expected Results (First 50 Emails)

- **Deliverability:** > 95%
- **Open Rate:** 30-35%
- **Reply Rate:** 3-5% (1-2 replies)
- **Qualified Leads:** 1-2
- **Booked Calls:** 0-1

## Next Steps

1. Send first batch (30-50 emails)
2. Monitor for 48 hours
3. Review metrics
4. Optimize based on results
5. Scale to full list

---

**Time Investment:** ~1 hour setup + ongoing monitoring  
**Expected ROI:** 1-2 qualified leads per 50 emails sent

