---
title: Error Handling: From "Something Went Wrong" to Production Alerts
date: 2025-01-19
excerpt: Our API returned "Something went wrong" for every error. When production broke at 2 AM, we didn't know until users complained 8 hours later.
---

# Error Handling: From "Something Went Wrong" to Production Alerts

Our API returned "Something went wrong" for every error. When production broke at 2 AM, we didn't know until users complained 8 hours later. Proper error handling would have alerted us in 2 minutes.

## The Problem

Generic error handling:
```javascript
try {
  // do something
} catch (error) {
  console.log(error); // Not visible in production!
  res.status(500).json({ error: 'Something went wrong' });
}
```

Result: No context, no alerts, no way to debug.

## The Solution

3-tier error handling:
- **Development:** Detailed stack traces, helpful debugging
- **Staging:** Structured logs, error tracking
- **Production:** User-friendly messages, alerts to team, no sensitive data

## Real Impact

**Before:**
- Error discovered: 8 hours later (user reports)
- Debugging time: 4 hours (no context)
- User experience: "Something went wrong"
- Team awareness: None

**After:**
- Error discovered: 2 minutes (automatic alerts)
- Debugging time: 15 minutes (structured logs with context)
- User experience: Clear, helpful messages
- Team awareness: Immediate (Slack alerts)

## Implementation

1. **Create error classes** - Different types for different errors
2. **Structured logging** - Include context (user, request, timestamp)
3. **Environment-specific responses** - Detailed in dev, safe in prod
4. **Alerting** - Send critical errors to team immediately

## The ROI

**10x faster incident response** - Know immediately when something breaks
**90% reduction in debugging time** - Structured logs with context
**Better user experience** - Clear, helpful error messages

## Start Today

Add structured error handling to one API endpoint. You'll see the difference immediately.

**From "Something went wrong" to "Production error: User 123, Order 456, Insufficient stock" in 2 minutes.**

