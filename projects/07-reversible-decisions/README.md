# Project 7: Reversible Decisions

## The Problem

Your deployments are all-or-nothing. If something breaks, you can't rollback quickly. Deployments take 1.5 hours and require manual steps. You're afraid to deploy on Friday because you can't fix issues over the weekend.

## Why It Matters

**Reversible decisions** mean you can undo changes quickly. Feature flags let you:
- **Deploy code without enabling it** - Test in production safely
- **Rollback in 2 minutes** - Not 1.5 hours
- **A/B test features** - See what works before committing
- **Deploy on Friday 5 PM** - Without fear

**Real Impact:**
- **Deploy in 8 minutes** - Not 1.5 hours
- **Rollback in 2 minutes** - Not hours of downtime
- **Deploy with confidence** - Test in production before enabling
- **Zero-downtime deployments** - Users never see broken features

**Cost of Irreversible Deployments:**
- Deployment time: 1.5 hours (manual steps)
- Rollback time: Hours to days (if possible at all)
- Fear of deploying: Deploy only on Monday mornings
- Production issues: Hours of downtime

## Learning Objectives

By completing this project, you'll learn to:
1. Implement feature flags
2. Create rollback strategies
3. Deploy safely to production
4. Monitor feature adoption
5. A/B test new features

## The Starter Code

The `starter/` folder contains:
- All-or-nothing deployments
- No feature flags
- Manual rollback process
- 1.5 hour deployment time

## Your Mission

1. **Implement feature flags** - Toggle features without redeploying
2. **Create rollback mechanism** - Revert in 2 minutes
3. **Add deployment automation** - Deploy in 8 minutes
4. **Compare with solution** to see production-grade deployment

## Expected Outcomes

After implementing reversible decisions, you'll have:
- ✅ Feature flags for all new features
- ✅ 2-minute rollback capability
- ✅ 8-minute deployments
- ✅ Zero-downtime releases
- ✅ Deploy with confidence

## Getting Started

```bash
# Navigate to this project
cd projects/07-reversible-decisions

# Install dependencies
npm install

# Run the starter code
npm start

# Run tests
npm test

# After fixing, compare with solution
npm run start:solution
```

## Deployment Impact

**Before:**
- Deployment: 1.5 hours (manual steps)
- Rollback: Hours to days
- Confidence: Low (afraid to deploy)
- Downtime: Hours when things break

**After:**
- Deployment: 8 minutes (automated)
- Rollback: 2 minutes (feature flags)
- Confidence: High (test in production first)
- Downtime: Zero (reversible decisions)

**ROI:** 10x faster deployments, 100x faster rollbacks, deploy anytime

## Next Steps

After completing this project:
1. Add feature flags to your deployments
2. Automate your deployment process
3. Create rollback runbooks
4. Move to Project 8: Advanced Patterns

