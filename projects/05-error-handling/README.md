# Project 5: Error Handling

## The Problem

Your API uses generic try/catch blocks that swallow errors. When something breaks in production, you have no idea what happened. Errors are logged to console (which you can't see) and users get generic "Something went wrong" messages.

## Why It Matters

**Structured error handling** means different behavior for different environments:
- **Development:** Detailed stack traces, helpful debugging info
- **Staging:** Structured logs, error tracking
- **Production:** User-friendly messages, alerts to team, no sensitive data

**Real Impact:**
- **Production errors alert team in < 2 minutes** - Not days later
- **Clear error messages** - Know exactly what broke
- **User-friendly responses** - Don't expose internals
- **Structured logging** - Searchable, filterable errors

**Cost of Poor Error Handling:**
- Debugging time: Hours to days (no context)
- User experience: Generic errors confuse users
- Production issues: Discovered days later
- Security: Exposing internal details

## Learning Objectives

By completing this project, you'll learn to:
1. Structure errors for different environments
2. Implement proper logging and alerting
3. Handle errors gracefully without breaking UX
4. Create error recovery strategies

## The Starter Code

The `starter/` folder contains an API with:
- Generic try/catch that swallows errors
- Console.log for errors (not visible in production)
- Generic error messages to users
- No error tracking or alerting

## Your Mission

1. **Create error classes** for different error types
2. **Implement 3-tier error handling** (dev/staging/prod)
3. **Add structured logging** with context
4. **Create alerting** for production errors
5. **Compare with solution** to see production-grade handling

## Expected Outcomes

After implementing proper error handling, you'll have:
- ✅ Environment-specific error responses
- ✅ Structured logging with context
- ✅ Production alerts for critical errors
- ✅ User-friendly error messages

## Getting Started

```bash
# Navigate to this project
cd projects/05-error-handling

# Install dependencies
npm install

# Run the starter code
npm start

# Run tests
npm test

# After fixing, compare with solution
npm run start:solution
```

## Production Ready Impact

**Before:**
- Error discovered: Days later (user reports)
- Debugging time: Hours (no context)
- User experience: "Something went wrong"
- Team awareness: None (no alerts)

**After:**
- Error discovered: < 2 minutes (automatic alerts)
- Debugging time: Minutes (structured logs with context)
- User experience: Clear, helpful messages
- Team awareness: Immediate (Slack/email alerts)

**ROI:** 10x faster incident response, 90% reduction in debugging time

## Next Steps

After completing this project:
1. Add error handling to your APIs
2. Set up error tracking (Sentry, Rollbar)
3. Create error runbooks
4. Move to Project 6: Testing Pyramid

