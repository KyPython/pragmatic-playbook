# Project 1: Broken Windows

## The Problem

You've inherited a Node.js API with multiple issues. The code works, but it's full of technical debt that's slowing down development. Every new feature takes longer because you have to work around existing problems.

## Why It Matters

Technical debt compounds like financial debt. Every $1 of debt you take on today costs $3-5 in future development time. The "broken windows" theory applies to code: one broken window (TODO, dead code, missing error handling) invites more broken windows.

**Real Impact:**
- Features that should take 2 days take 2 weeks
- Bugs are harder to find and fix
- New team members struggle to understand the code
- Refactoring becomes risky and expensive

## Learning Objectives

By completing this project, you'll learn to:
1. Identify technical debt in codebases
2. Calculate the true cost of shortcuts
3. Understand the compound interest of bad code
4. Prioritize debt repayment based on ROI

## The Starter Code

The `starter/` folder contains a Node.js API with 5 real issues:

1. **TODO comments** that were never completed (3 instances)
2. **Dead imports** - unused code that confuses readers
3. **Duplicated logic** - discount calculation in multiple places
4. **Missing error handling** - API crashes on invalid input
5. **Test file that never runs** - tests exist but aren't executed

## Your Mission

1. **Identify all 5 issues** in the starter code
2. **Fix each issue** following best practices
3. **Run the tests** to verify your fixes
4. **Compare with solution** to see the reference implementation

## Expected Outcomes

After fixing the issues, you'll have:
- ✅ Clean, maintainable code
- ✅ All tests passing
- ✅ No TODO comments
- ✅ ✅ Proper error handling
- ✅ Single source of truth for business logic

## Getting Started

```bash
# Navigate to this project
cd projects/01-broken-windows

# Install dependencies
npm install

# Run the starter code (see the issues)
npm start

# Run tests (they should fail initially)
npm test

# After fixing, compare with solution
npm run start:solution
```

## Cost Calculation

**Before:** 
- New feature: 2 weeks (working around debt)
- Bug fix: 1 day (hard to find root cause)
- Onboarding: 1 week (confusing codebase)

**After:**
- New feature: 2 days (clean codebase)
- Bug fix: 2 hours (clear code paths)
- Onboarding: 1 day (well-organized code)

**ROI:** 5x faster development = $50k saved per year for a team of 3

## Next Steps

After completing this project:
1. Run the same audit on your own codebase
2. Create a technical debt inventory
3. Prioritize fixes by cost and impact
4. Move to Project 2: Tracer Bullets

