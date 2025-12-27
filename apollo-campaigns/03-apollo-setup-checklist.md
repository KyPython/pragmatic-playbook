# Apollo Setup Checklist

Complete setup guide for launching Apollo campaigns for The Founder's Infrastructure Playbook.

## Pre-Setup Requirements

### 1. Apollo Account Setup
- [ ] Sign up for Apollo account (or log in)
- [ ] Verify email address
- [ ] Complete profile setup
- [ ] Add billing information (if needed)
- [ ] Verify account limits and credits

### 2. HubSpot Integration (Optional but Recommended)
- [ ] Connect HubSpot account to Apollo
- [ ] Verify contact sync is working
- [ ] Set up two-way sync (if available)
- [ ] Test contact creation from Apollo

## Step 1: Create ICP Lists (30 minutes)

### List 1: Primary Target - Seed/Series A CTOs
- [ ] Go to Apollo → Lists → Create List
- [ ] Name: "Seed-Series A CTOs - Velocity Wall"
- [ ] Apply filters (ALL REQUIRED):
  - [ ] Title: CTO, VP Engineering, Head of Engineering
  - [ ] Company Size: 11-50 employees (sweet spot: 15-30)
  - [ ] Industry: Software, Internet, Computer Software
  - [ ] Funding: Seed ($500K-$2M) OR Series A ($2M-$10M) - REQUIRED
  - [ ] Location: United States (primary market)
  - [ ] Technology: Node.js OR Python OR AWS OR GitHub
  - [ ] Company Age: 2-5 years (hitting velocity wall)
- [ ] Save list
- [ ] Review list size (target: 300-800 contacts)
- [ ] Export sample to verify data quality
- [ ] Check for recent funding announcements (last 6-12 months)

### List 2: Technical Founders
- [ ] Create list: "Technical Founders - Seed Stage"
- [ ] Apply filters:
  - [ ] Title: Co-founder, Founder, Technical Co-founder
  - [ ] Company Size: 5-20 employees
  - [ ] Funding: Seed
  - [ ] Technology: Node.js, Python, React, AWS
- [ ] Save and review

### List 3: Engineering Leads (Backup)
- [ ] Create list: "Engineering Leads - Growing Teams"
- [ ] Apply filters:
  - [ ] Title: Engineering Lead, Tech Lead, Lead Engineer
  - [ ] Company Size: 20-50 employees
  - [ ] Recent Activity: Posted on LinkedIn in last 30 days
- [ ] Save and review

## Step 2: Enrich Contact Data (15 minutes)

### Data Enrichment
- [ ] Enable email finder for all lists
- [ ] Verify email addresses (Apollo auto-verifies)
- [ ] Add company funding data (if available)
- [ ] Add team size data
- [ ] Add technology stack (if available)
- [ ] Review data quality score

### Segmentation
- [ ] Segment by company size (11-20, 21-50)
- [ ] Segment by funding stage (Seed, Series A)
- [ ] Segment by technology stack
- [ ] Create tags for each segment

## Step 3: Create Email Sequences (45 minutes)

### Sequence 1: Consulting Outreach (PRIMARY)
- [ ] Go to Apollo → Sequences → Create Sequence
- [ ] Name: "Consulting Outreach - Seed/Series A CTOs"
- [ ] Target: List 1 (Seed-Series A CTOs)
- [ ] Add Email 1: "Quick question about [Company]'s deployment speed"
  - [ ] Copy content from `02-email-sequences.md` (Sequence 1, Email 1)
  - [ ] Set delay: Day 0
  - [ ] Add personalization: [First Name], [Company Name], [Funding Round]
  - [ ] Subject line: "Quick question about [Company]'s deployment speed"
- [ ] Add Email 2: "Re: [Company]'s deployment speed"
  - [ ] Copy content from Sequence 1, Email 2
  - [ ] Set delay: Day 3 (if no reply)
  - [ ] Add personalization: [First Name], [Company Name]
- [ ] Add Email 3: "$1,500 audit - Find $50K in hidden costs"
  - [ ] Copy content from Sequence 1, Email 3
  - [ ] Set delay: Day 7 (if no reply)
  - [ ] Add personalization: [First Name]
- [ ] Set up auto-follow-up rules:
  - [ ] If reply → Remove from sequence, mark as "Responded"
  - [ ] If books call → Mark as "Qualified Lead"
  - [ ] If says "not interested" → Remove and tag
- [ ] Test sequence with your own email
- [ ] Verify personalization tokens work

### Sequence 2: Course Launch
- [ ] Create sequence: "Course Launch - 8 Week Sequence"
- [ ] Add 5 emails from `02-email-sequences.md`
- [ ] Set delays: Day 0, 7, 21, 42, 56
- [ ] Configure for course students only
- [ ] Test sequence

### Sequence 3: Nurture
- [ ] Create sequence: "Nurture - Educational"
- [ ] Add ongoing emails (weekly/bi-weekly)
- [ ] Set up rotation schedule
- [ ] Configure for all contacts

## Step 4: Configure Automation Rules (20 minutes)

### Reply Handling
- [ ] If contact replies → Remove from sequence
- [ ] If contact books call → Mark as "Qualified Lead"
- [ ] If contact says "not interested" → Remove and tag
- [ ] If contact asks for more info → Send to nurture sequence

### Bounce Handling
- [ ] If hard bounce → Remove from sequence
- [ ] If soft bounce → Retry once, then remove
- [ ] Flag invalid emails for review

### Unsubscribe Handling
- [ ] If unsubscribe → Remove immediately
- [ ] Add to "Do Not Contact" list
- [ ] Sync with HubSpot (if integrated)

### Engagement Rules
- [ ] If opens 3+ emails → Mark as "Engaged"
- [ ] If clicks link → Mark as "Interested"
- [ ] If no opens after 3 emails → Pause sequence

## Step 5: Personalization Setup (15 minutes)

### Custom Fields
- [ ] Set up custom fields in Apollo:
  - [ ] Company Funding Amount
  - [ ] Team Size
  - [ ] Technology Stack
  - [ ] Pain Point (if known)
- [ ] Map fields for personalization

### Email Templates
- [ ] Create email templates in Apollo
- [ ] Add personalization tokens:
  - [ ] [First Name]
  - [ ] [Company Name]
  - [ ] [Recent Funding] (if available)
  - [ ] [Tech Stack] (if available)
- [ ] Test templates with sample data

### Sender Setup
- [ ] Configure sender email address
- [ ] Set up email signature
- [ ] Verify SPF/DKIM records (for deliverability)
- [ ] Test email sending

## Step 6: Tracking & Analytics (15 minutes)

### Apollo Analytics
- [ ] Enable open tracking
- [ ] Enable click tracking
- [ ] Set up reply tracking
- [ ] Configure conversion tracking

### Dashboard Setup
- [ ] Create dashboard for campaign metrics
- [ ] Track key metrics:
  - [ ] Emails sent
  - [ ] Open rate (target: 30%+)
  - [ ] Click rate (target: 5%+)
  - [ ] Reply rate (target: 3%+)
  - [ ] Booked calls
  - [ ] Unsubscribe rate (keep < 1%)

### Integration Tracking
- [ ] Connect to CRM (HubSpot) for tracking
- [ ] Set up webhook for conversions
- [ ] Configure lead scoring (if available)

## Step 7: Compliance & Legal (10 minutes)

### Email Compliance
- [ ] Add unsubscribe link (Apollo adds automatically)
- [ ] Include physical address (if required)
- [ ] Review CAN-SPAM compliance
- [ ] Review GDPR compliance (if targeting EU)
- [ ] Set up privacy policy link

### Data Privacy
- [ ] Review data retention policies
- [ ] Set up data deletion rules
- [ ] Configure consent management
- [ ] Review terms of service

## Step 8: Test Campaign (30 minutes)

### Pre-Launch Testing
- [ ] Send test email to yourself
- [ ] Verify personalization works
- [ ] Check email formatting
- [ ] Test all links
- [ ] Verify tracking pixels
- [ ] Test unsubscribe flow
- [ ] Test reply handling

### Small Batch Test
- [ ] Select 10-20 contacts for test
- [ ] Send first email
- [ ] Monitor for 24 hours
- [ ] Check deliverability
- [ ] Review engagement metrics
- [ ] Fix any issues

## Step 9: Launch Campaign (15 minutes)

### Final Checklist
- [ ] All sequences created and tested
- [ ] Lists are ready (500-2,000 contacts)
- [ ] Personalization configured
- [ ] Automation rules set up
- [ ] Tracking enabled
- [ ] Compliance verified
- [ ] Test campaign successful

### Launch Steps
- [ ] Select target list
- [ ] Assign to sequence
- [ ] Set daily send limits (start conservative: 50-100/day)
- [ ] Enable sequence
- [ ] Monitor first 24 hours closely

## Step 10: Monitor & Optimize (Ongoing)

### Daily Monitoring (First Week)
- [ ] Check deliverability rates
- [ ] Monitor open rates
- [ ] Track reply rates
- [ ] Review bounce rates
- [ ] Check unsubscribe rates
- [ ] Monitor for spam complaints

### Weekly Review
- [ ] Review engagement metrics
- [ ] Identify top-performing emails
- [ ] Identify underperforming segments
- [ ] A/B test subject lines
- [ ] A/B test send times
- [ ] Adjust sequences based on data

### Monthly Optimization
- [ ] Refine ICP based on conversion data
- [ ] Update email content based on responses
- [ ] Adjust send frequency
- [ ] Clean up unengaged contacts
- [ ] Scale successful campaigns

## Success Metrics (Consulting Services ICP)

### Week 1 Targets
- [ ] Deliverability: > 95%
- [ ] Open Rate: > 30% (CTOs are engaged)
- [ ] Click Rate: > 5% (interested in solutions)
- [ ] Reply Rate: > 3% (strong signal)
- [ ] Unsubscribe Rate: < 1%
- [ ] Booked Calls: 1-2 per 100 emails sent

### Month 1 Targets
- [ ] Open Rate: > 35% (refined targeting)
- [ ] Click Rate: > 7% (better messaging)
- [ ] Reply Rate: > 5% (qualified ICP)
- [ ] Qualified Leads: 10-20 (responded + booked call)
- [ ] Booked Calls: 5-10 (discovery calls scheduled)
- [ ] Closed Deals: 1-2 (from booked calls)

### Conversion Funnel (Expected)
- 1,000 contacts → 350 opens (35%) → 50 clicks (5%) → 30 replies (3%) → 10 booked calls (1%) → 2 closed deals (0.2%)

### ROI Calculation
- **Investment:** Apollo credits + time
- **Output:** 1-2 consulting projects ($1,500-$3,500 each)
- **ROI:** 3-7x on first month (if 1-2 deals close)

### Optimization Goals
- [ ] Identify best send times
- [ ] Identify best subject lines
- [ ] Refine ICP based on conversions
- [ ] Improve email content based on replies
- [ ] Scale to 1,000+ contacts/month

## Troubleshooting

### Low Open Rates
- [ ] Check subject lines (test alternatives)
- [ ] Verify sender reputation
- [ ] Check send times (test different times)
- [ ] Review list quality (remove invalid emails)

### Low Reply Rates
- [ ] Make emails more personal
- [ ] Add stronger CTAs
- [ ] Reduce email length
- [ ] Test different value propositions

### High Bounce Rates
- [ ] Verify email addresses
- [ ] Clean up invalid emails
- [ ] Check domain reputation
- [ ] Review list sources

### Deliverability Issues
- [ ] Verify SPF/DKIM records
- [ ] Warm up sending domain
- [ ] Reduce send volume
- [ ] Check blacklist status

## Resources

- Apollo Help Center: https://help.apollo.io
- Email Deliverability Guide: [Link]
- ICP Profile: See `01-consulting-icp-profile.md`
- Email Sequences: See `02-email-sequences.md`

## Next Steps After Setup

1. Launch test campaign (10-20 contacts)
2. Monitor for 48 hours
3. Review metrics and optimize
4. Scale to full list
5. Set up weekly review process
6. Iterate based on data

---

**Status:** Ready to launch
**Estimated Setup Time:** 3-4 hours
**Expected Results:** 5-10 qualified leads per 1,000 contacts

