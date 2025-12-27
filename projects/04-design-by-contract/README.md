# Project 4: Design by Contract

## The Problem

Your banking API silently accepts negative balances and oversells inventory. Bugs slip through because functions don't validate their inputs. By the time you discover the problem, data is corrupted and hard to fix.

## Why It Matters

**Design by Contract** means every function has clear preconditions (what it expects) and postconditions (what it guarantees). When preconditions aren't met, the function fails fast with a clear error message.

**Real Impact:**
- **Catch bugs at the edge** - Before they corrupt data
- **Clear error messages** - Know exactly what went wrong
- **Fail fast** - Don't let bad data propagate
- **Prevent silent failures** - No more "it worked but the data is wrong"

**Cost of Missing Contracts:**
- Data corruption: Hours to days to fix
- Silent failures: Bugs discovered weeks later
- Unclear errors: Hard to debug
- Production issues: Users see wrong data

## Learning Objectives

By completing this project, you'll learn to:
1. Define clear contracts for functions
2. Validate inputs at boundaries
3. Fail fast with clear error messages
4. Prevent data corruption through validation

## The Starter Code

The `starter/` folder contains a banking API with:
- `withdraw()` accepts negative balances (silent failure)
- `sellItem()` oversells inventory (no stock check)
- `transfer()` allows invalid amounts (no validation)
- All functions fail silently or return wrong results

## Your Mission

1. **Add precondition checks** to all functions
2. **Validate inputs** at function boundaries
3. **Fail fast** with clear error messages
4. **Test edge cases** to verify contracts work
5. **Compare with solution** to see proper contracts

## Expected Outcomes

After adding contracts, you'll have:
- ✅ Functions that validate their inputs
- ✅ Clear error messages when contracts are violated
- ✅ Fail-fast behavior (no silent failures)
- ✅ Protected data integrity

## Getting Started

```bash
# Navigate to this project
cd projects/04-design-by-contract

# Install dependencies
npm install

# Run the starter code (see silent failures)
npm start

# Run tests
npm test

# After fixing, compare with solution
npm run start:solution
```

## Bug Catch Impact

**Before:**
- Negative balance: Accepted silently (data corruption)
- Oversold inventory: No error (wrong stock counts)
- Invalid transfer: Returns wrong result (hard to debug)

**After:**
- Negative balance: Fails immediately with clear error
- Oversold inventory: Fails before corrupting data
- Invalid transfer: Clear error message at boundary

**ROI:** Catch bugs in 2 minutes instead of 2 weeks, prevent data corruption

## Next Steps

After completing this project:
1. Add contracts to your own functions
2. Validate all external inputs
3. Fail fast with clear messages
4. Move to Project 5: Error Handling

