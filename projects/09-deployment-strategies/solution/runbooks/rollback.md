# Rollback Runbook

## Overview

This runbook documents the rollback procedures for the application.

## When to Rollback

- Critical bugs in production
- Performance degradation
- Security issues
- Data corruption risk

## Rollback Process

### Automated Rollback (Vercel)

1. **Go to Vercel Dashboard:**
   - Select project
   - Go to Deployments
   - Find previous working deployment

2. **Promote previous deployment:**
   - Click "..." menu
   - Select "Promote to Production"

3. **Verify rollback:**
   - Check application URL
   - Verify functionality
   - Monitor error rates

### Manual Rollback (Git)

1. **Identify previous working commit:**
   ```bash
   git log --oneline -10
   ```

2. **Revert to previous commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Or reset to previous commit (if no one else has pulled):**
   ```bash
   git reset --hard <previous-commit-hash>
   git push origin main --force
   ```

## Post-Rollback

1. **Verify functionality:**
   - Test critical paths
   - Check error rates
   - Monitor performance

2. **Investigate issue:**
   - Review error logs
   - Identify root cause
   - Create fix

3. **Notify team:**
   - Rollback complete
   - Issue identified
   - Fix in progress

## Prevention

- Always test in staging first
- Use feature flags for risky changes
- Monitor deployments closely
- Have rollback plan ready

---

**Remember:** Rollback quickly if production is broken. Fix can come later.

