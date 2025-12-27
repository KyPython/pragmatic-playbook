# Project 3: DRY Refactor

## The Problem

Your e-commerce codebase has discount calculation logic duplicated in 3 different places. When you need to change the discount rules (e.g., add a maximum discount cap), you have to remember to update it in 3 places. One place always gets forgotten, causing inconsistent behavior and bugs.

## Why It Matters

**DRY (Don't Repeat Yourself)** is one of the most fundamental principles in software development. Every piece of knowledge should have a single, unambiguous representation in your system.

**Real Impact:**
- **Change once, works everywhere** - Fix bugs in one place
- **Consistent behavior** - No more "why does this work differently here?"
- **Faster development** - Reuse instead of rewrite
- **Easier testing** - Test the logic once, not 3 times

**Cost of Duplication:**
- Bug fixes: 3x the time (fix in 3 places)
- Feature changes: 3x the risk (might miss one)
- Testing: 3x the effort (test each copy)
- Maintenance: 3x the confusion (which one is correct?)

## Learning Objectives

By completing this project, you'll learn to:
1. Identify code duplication
2. Extract common logic into reusable functions
3. Understand when duplication is acceptable
4. Measure the cost of duplication

## The Starter Code

The `starter/` folder contains an e-commerce system with:
- Discount calculation duplicated in `cart.js`, `checkout.js`, and `promotions.js`
- Same validation logic repeated 3 times
- Same error handling copied 3 times
- Inconsistent behavior when one copy isn't updated

## Your Mission

1. **Identify all duplications** in the starter code
2. **Extract common logic** into a single function
3. **Refactor all 3 files** to use the shared function
4. **Run tests** to verify behavior is unchanged
5. **Compare with solution** to see the clean version

## Expected Outcomes

After refactoring, you'll have:
- ✅ Single source of truth for discount logic
- ✅ Consistent behavior across all modules
- ✅ Easier to maintain and test
- ✅ Change once, works everywhere

## Getting Started

```bash
# Navigate to this project
cd projects/03-dry-refactor

# Install dependencies
npm install

# Run the starter code
npm start

# Run tests (they should pass, but code is duplicated)
npm test

# After refactoring, compare with solution
npm run start:solution
```

## Change Impact

**Before:**
- Change discount rules: Update 3 files (30 minutes, high risk of missing one)
- Fix bug: Fix in 3 places (1 hour)
- Add new discount type: Copy-paste to 3 places (45 minutes)

**After:**
- Change discount rules: Update 1 function (5 minutes, zero risk)
- Fix bug: Fix once (10 minutes)
- Add new discount type: Add to shared function (15 minutes)

**ROI:** 3x faster changes, 90% fewer bugs from inconsistencies

## Next Steps

After completing this project:
1. Audit your own codebase for duplication
2. Create a shared utilities module
3. Refactor one duplication per week
4. Move to Project 4: Design by Contract

