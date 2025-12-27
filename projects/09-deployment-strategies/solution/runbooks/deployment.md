# Deployment Runbook

## Overview

This runbook documents the deployment procedures for the application.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database migrations ready (if applicable)
- [ ] Monitoring configured

## Deployment Process

### Automated Deployment (Recommended)

1. **Push to main branch:**
   ```bash
   git push origin main
   ```

2. **GitHub Actions will:**
   - Run tests
   - Build application
   - Deploy to production

3. **Monitor deployment:**
   - Check GitHub Actions status
   - Verify deployment in Vercel dashboard
   - Check application health

### Manual Deployment (Emergency Only)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Verify deployment:**
   - Check application URL
   - Verify functionality
   - Check error logs

## Post-Deployment

1. **Verify functionality:**
   - Test critical paths
   - Check error rates
   - Monitor performance

2. **Notify team:**
   - Deployment complete
   - Any known issues
   - Rollback plan if needed

## Rollback Procedure

See `rollback.md` for detailed rollback procedures.

## Troubleshooting

See `troubleshooting.md` for common issues and solutions.

---

**Remember:** Automated deployment is preferred. Manual deployment should only be used in emergencies.

