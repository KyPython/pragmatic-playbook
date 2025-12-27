# Simple Email Solution for Marketing Hub Starter

## The Problem

Marketing Hub Starter doesn't include workflows. You need Professional ($90/month) for automated email sequences.

## Simple Solutions (No Workflows Needed)

### Option 1: Manual Email Sending (Free)

**How it works:**
1. Contacts are saved to HubSpot when they sign up
2. You manually send emails from HubSpot when ready

**Steps:**
1. Go to HubSpot → Marketing → Email
2. Create email from template
3. Use content from `emails/01-course-launch-sequence.md`
4. Send to contacts with `lifecyclestage = 'subscriber'`

**Pros:**
- ✅ Free (uses your existing plan)
- ✅ Full control over timing
- ✅ No code changes needed

**Cons:**
- ❌ Manual work
- ❌ No automation

### Option 2: HubSpot Email API (If Available)

HubSpot Starter might allow sending emails via API. Check if you have access to:
- Marketing → Email → Settings → API access

If available, we can add a simple welcome email to the signup API.

### Option 3: Upgrade to Professional

**Cost:** $90/month (Marketing Hub Professional)

**Includes:**
- ✅ Automated workflows
- ✅ Email sequences
- ✅ Visual workflow builder
- ✅ 2,000 marketing contacts
- ✅ 5,000 email sends/month

**When to upgrade:**
- You have 50+ signups/month
- You want automation
- You want to scale

### Option 4: Use SendGrid (Separate Service)

**Cost:** ~$20/month (SendGrid Starter)

**Includes:**
- ✅ 50,000 emails/month
- ✅ Better deliverability
- ✅ Full API access
- ✅ Custom email sequences

**Setup:**
1. Create SendGrid account
2. Authenticate domain
3. Add `SENDGRID_API_KEY` to Vercel
4. Code already supports SendGrid (just uncomment it)

## Recommended Approach

**For now (Starter plan):**
1. ✅ Save contacts to HubSpot (already working)
2. ✅ Send welcome email manually from HubSpot (when you have time)
3. ✅ Track engagement in HubSpot

**When to upgrade:**
- You have 20+ signups/month
- You want automation
- You're ready to scale

## Quick Manual Email Template

Copy this into HubSpot when sending manually:

**Subject:** Welcome to The Founder's Infrastructure Playbook

**Body:**
```
Hi {{contact.firstname}},

Welcome! You've taken the first step toward building production-grade infrastructure.

Over the next 8 weeks, you'll learn:
- How to detect technical debt before it costs $50k
- How to build MVPs in 2 weeks instead of 3 months
- How to deploy on Friday 5 PM with confidence

Questions? Just reply to this email.

Let's build something great,
Founders Infrastructure

---
The Founder's Infrastructure Playbook
foundersinfra.com
```

## Next Steps

1. ✅ Contacts are already being saved to HubSpot
2. ⏳ Send welcome emails manually (when you have time)
3. ⏳ Consider upgrading to Professional when you scale

---

**Bottom line:** Your landing page is working! Contacts are saved. You can send emails manually or upgrade when ready.

