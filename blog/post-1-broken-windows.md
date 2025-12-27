---
title: The Broken Windows Theory: How $1 of Technical Debt Costs $5
date: 2025-01-15
excerpt: Last week, I inherited a codebase with 47 TODO comments. Not a big deal, right? Wrong. Those TODOs cost us $50,000 in the next 6 months.
---

# The Broken Windows Theory: How $1 of Technical Debt Costs $5

Last week, I inherited a codebase with 47 TODO comments. Not a big deal, right? Wrong. Those TODOs cost us $50,000 in the next 6 months.

## The Theory

The "Broken Windows" theory from criminology applies perfectly to code: one broken window (a TODO, dead code, missing error handling) invites more broken windows. Before you know it, your codebase is a crime scene.

## The Real Cost

Here's what happened:

1. **Week 1:** Developer sees TODO comment, adds another TODO nearby
2. **Week 2:** New feature takes 2 days instead of 2 hours (working around debt)
3. **Week 3:** Bug fix requires updating 3 places (code duplication)
4. **Month 2:** New team member takes 2 weeks to onboard (confusing codebase)
5. **Month 3:** Production bug from missing error handling (2 days to fix)

**Total cost:** $50,000 in lost productivity and bug fixes.

## The Math

Every $1 of technical debt you take on today costs $3-5 in future development time. That TODO comment that saves you 5 minutes today? It'll cost you 25 minutes next month when someone has to figure out what it means.

## The Solution

1. **Audit your codebase** - Find all broken windows
2. **Calculate the cost** - Every TODO, every duplication, every missing test
3. **Prioritize by ROI** - Fix the highest-cost items first
4. **Prevent new debt** - Code reviews, automated checks, team standards

## Start Today

Run this in your codebase:
```bash
grep -r "TODO" . | wc -l
```

If you have more than 10 TODOs, you have technical debt. Start fixing it today, or it will compound into a $50k problem.

**The best time to fix broken windows was 6 months ago. The second best time is now.**

