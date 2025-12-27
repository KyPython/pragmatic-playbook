# Apollo Sequences - Ready to Import

Copy-paste ready email sequences for Apollo. Just copy into Apollo sequence editor.

## Sequence 1: Consulting Outreach (3 Emails)

### Email 1: Problem-First Outreach

**Subject:**
```
Quick question about {{company.name}}'s deployment speed
```

**Body:**
```
Hi {{first_name}},

I noticed {{company.name}} recently raised {{funding_round}}. Congrats!

Quick question: How long does it take to deploy a new feature?

Most Seed/Series A startups I work with say 2-3 weeks (used to be 2 days). 

I know there are other consultants and tools out there. What I do differently: I focus specifically on the "velocity wall" that hits teams after 6+ months of shipping.

I help teams get back to 2-day feature cycles through:
- Technical debt audits (find $50K+ in hidden costs)
- CI/CD pipelines (8-minute deployments, 2-minute rollbacks)
- Testing infrastructure (70%+ coverage in one week)

**Important:** This only works if you're ready to invest time. If you're not, that's totally fine - happy to point you to other resources.

Would you be open to a 15-minute call to discuss your infrastructure challenges?

No pitch, just a conversation to see if I can help.

Best,
[Your Name]

P.S. I helped a Series A startup reduce deployment time from 1.5 hours to 8 minutes. They now deploy on Friday 5 PM with confidence (not fear - that's too strong a word).
```

**Settings:**
- Delay: Day 0
- Personalization: {{first_name}}, {{company.name}}, {{funding_round}}

---

### Email 2: Value-First Follow-up

**Subject:**
```
Re: {{company.name}}'s deployment speed
```

**Body:**
```
Hi {{first_name}},

Following up on my last email. I know you're busy.

Quick case study: I helped a Series A startup (similar to {{company.name}}) reduce deployment time from 1.5 hours to 8 minutes. They now deploy on Friday 5 PM with confidence.

The cost of slow deployments for Seed/Series A teams:
- Features take 2-3 weeks instead of 2 days
- Team hesitant to deploy (only Monday mornings)
- Production bugs take hours to fix
- New engineers take 2+ weeks to onboard

**ROI:** They recovered $180K/year in lost velocity.

**I get it** - you've probably tried other solutions. Maybe they didn't work, or maybe the timing wasn't right. That's okay.

What I'd love to understand: What's your biggest pain point right now? Deployment speed? Technical debt? Team scaling?

Would 15 minutes be worth it to discuss what's actually blocking your team?

Best,
[Your Name]
```

**Settings:**
- Delay: Day 3 (if no reply)
- Personalization: {{first_name}}, {{company.name}}

---

### Email 3: Low-Risk Entry Point

**Subject:**
```
$1,500 audit - Find $50K in hidden costs
```

**Body:**
```
Hi {{first_name}},

I get it - you're busy. Let me make this easy.

**Low-risk offer:** I'll audit your codebase (4 hours) and give you:
- Technical debt inventory (with cost estimates)
- Prioritized improvement roadmap
- 90-day action plan

**Investment:** $1,500 (typically find $20K-$50K in hidden costs)

**Important:** This won't work if:
- You're not ready to invest time implementing changes
- You're looking for a quick fix (this takes 90 days)
- Your team isn't on board

Most Seed/Series A teams I audit find $20K-$50K in technical debt they didn't know existed. But some find less, and that's okay - at least you'll know what you're dealing with.

**Time investment:** 30 minutes of your time for the audit call.

Interested? Reply with "yes" and I'll send a calendar link.

Best,
[Your Name]

P.S. If you're not ready for an audit, happy to do a free 15-minute call to discuss your challenges. No pressure.
```

**Settings:**
- Delay: Day 7 (if no reply)
- Personalization: {{first_name}}

---

## Automation Rules

Set these up in Apollo:

1. **If contact replies:**
   - Remove from sequence
   - Tag as "Responded"
   - Send notification email

2. **If contact books call:**
   - Remove from sequence
   - Tag as "Qualified Lead"
   - Send to CRM (if integrated)

3. **If contact says "not interested":**
   - Remove from sequence
   - Tag as "Not Interested"
   - Don't send future emails

4. **If hard bounce:**
   - Remove from sequence
   - Tag as "Invalid Email"
   - Don't retry

5. **If soft bounce:**
   - Retry once
   - If still fails, remove

## Personalization Tokens

Apollo supports these tokens (verify in your account):

- `{{first_name}}` - Contact's first name
- `{{last_name}}` - Contact's last name
- `{{company.name}}` - Company name
- `{{company.website}}` - Company website
- `{{funding_round}}` - Funding round (if available)
- `{{job_title}}` - Job title

## Testing Checklist

Before launching:

- [ ] Test email sent to yourself
- [ ] Verify personalization works
- [ ] Check all links work
- [ ] Verify formatting (mobile + desktop)
- [ ] Confirm sender email: founders@foundersinfra.com
- [ ] Test reply handling
- [ ] Verify tracking pixels load

## Quick Import Steps

1. **Go to Apollo:**
   - Sequences → Create Sequence

2. **Add Email 1:**
   - Copy subject and body above
   - Set delay: Day 0
   - Add personalization tokens

3. **Add Email 2:**
   - Copy subject and body above
   - Set delay: Day 3
   - Add personalization tokens

4. **Add Email 3:**
   - Copy subject and body above
   - Set delay: Day 7
   - Add personalization tokens

5. **Set Automation Rules:**
   - Configure rules listed above

6. **Test:**
   - Add yourself to sequence
   - Verify all emails arrive
   - Check personalization

7. **Launch:**
   - Assign to your ICP list
   - Start sequence

---

**These sequences are ready to use - just copy and paste into Apollo!**

