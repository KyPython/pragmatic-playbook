---
title: Design by Contract: Catch Bugs at the Edge
date: 2025-01-18
excerpt: Our API silently accepted negative balances. By the time we discovered it, 47 accounts had corrupted data.
---

# Design by Contract: Catch Bugs at the Edge

Our API silently accepted negative balances. By the time we discovered it, 47 accounts had corrupted data. Design by Contract would have caught it in 2 minutes.

## What is Design by Contract?

Every function has clear **preconditions** (what it expects) and **postconditions** (what it guarantees). When preconditions aren't met, the function fails fast with a clear error message.

## The Problem

Our `withdraw()` function didn't validate inputs:
```javascript
function withdraw(accountId, amount) {
  account.balance -= amount; // Can go negative!
}
```

Result: 47 accounts with negative balances, corrupted data, hours to fix.

## The Solution

Add preconditions:
```javascript
function withdraw(accountId, amount) {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }
  if (account.balance < amount) {
    throw new Error('Insufficient balance');
  }
  account.balance -= amount;
}
```

Result: Bugs caught immediately, clear error messages, no data corruption.

## The Benefits

1. **Catch bugs at the edge** - Before they corrupt data
2. **Clear error messages** - Know exactly what went wrong
3. **Fail fast** - Don't let bad data propagate
4. **Prevent silent failures** - No more "it worked but data is wrong"

## Real Impact

**Before:** Negative balance accepted → Data corrupted → 2 days to fix
**After:** Negative balance rejected → Clear error → No corruption

**ROI:** Catch bugs in 2 minutes instead of 2 weeks.

## How to Apply

1. **Define preconditions** - What must be true before the function runs?
2. **Validate at boundaries** - Check inputs at function entry
3. **Fail fast** - Throw clear errors immediately
4. **Document contracts** - Make preconditions explicit

## Start Today

Add one precondition check to your most critical function. You'll catch bugs before they become expensive.

**Fail fast. Fail clearly. That's Design by Contract.**

