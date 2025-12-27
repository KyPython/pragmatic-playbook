---
title: DRY: Why Code Duplication Costs 3x More
date: 2025-01-17
excerpt: I found the same discount calculation in 3 different files. When I needed to change it, I updated 2 files and forgot the third. Users saw inconsistent prices.
---

# DRY: Why Code Duplication Costs 3x More

I found the same discount calculation in 3 different files. When I needed to change it, I updated 2 files and forgot the third. Users saw inconsistent prices. That's the cost of duplication.

## What is DRY?

**Don't Repeat Yourself** - Every piece of knowledge should have a single, unambiguous representation in your system.

## The Real Cost

Here's what happened:

1. **Discount calculation duplicated** in cart.js, checkout.js, promotions.js
2. **Bug fix required** updating 3 files (30 minutes instead of 10)
3. **I forgot one file** - Users saw wrong prices
4. **Production bug** - 2 days to find and fix
5. **Lost trust** - Users questioned our pricing

**Total cost:** $5,000 in lost revenue and debugging time.

## The Math

Every duplication multiplies your maintenance cost:
- **1 copy:** Fix once (10 minutes)
- **3 copies:** Fix 3 times (30 minutes) + risk of missing one
- **10 copies:** Fix 10 times (100 minutes) + high risk of inconsistency

## When Duplication is OK

Sometimes duplication is acceptable:
- **Different contexts** - Same logic, different domains
- **Temporary duplication** - During refactoring
- **Performance critical** - Copying avoids function call overhead

But 99% of the time, duplication is technical debt.

## How to Apply DRY

1. **Find duplications** - Use tools or code reviews
2. **Extract common logic** - Create shared functions
3. **Update all callers** - Use the shared function
4. **Test once** - Verify the shared logic works

## Start Today

Search your codebase for duplicated logic:
```bash
# Find similar code blocks
grep -r "discount" . | wc -l
```

If you see the same logic in multiple places, extract it. Your future self will thank you.

**Change once, work everywhere. That's DRY.**

