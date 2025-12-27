# Bug List: Broken Windows Project

## Bug #1: TODO Comments (3 instances)

**Location:** `starter/auth.js`
- Line 15: `// TODO: Implement rate limiting`
- Line 28: `// TODO: Add token expiration check`
- Line 42: `// TODO: Validate user permissions`

**Impact:** 
- Security vulnerabilities (no rate limiting, no token expiration)
- Confusing for developers (is this done or not?)
- Technical debt that compounds

**How to Find:**
```bash
grep -r "TODO" starter/
```

**Fix:** Either implement the feature or remove the TODO with a ticket reference.

---

## Bug #2: Dead Imports

**Location:** `starter/auth.js`
- Line 3: `const crypto = require('crypto');` (never used)
- Line 5: `const fs = require('fs');` (never used)

**Impact:**
- Confusing imports (what's this for?)
- Unnecessary dependencies
- Slower code reviews

**How to Find:**
```bash
# Run linter or check manually
node -e "const code = require('fs').readFileSync('starter/auth.js', 'utf8'); console.log(code)"
```

**Fix:** Remove unused imports.

---

## Bug #3: Duplicated Discount Logic

**Location:** `starter/utils.js`
- Lines 10-25: `calculateDiscount()` function
- Lines 30-45: Same logic duplicated in `applyPromoCode()`
- Lines 50-65: Same logic again in `getFinalPrice()`

**Impact:**
- Bug fixes must be applied in 3 places
- Inconsistent behavior if one copy isn't updated
- Maintenance nightmare

**How to Find:**
```bash
# Look for similar code blocks
grep -A 10 "discount" starter/utils.js
```

**Fix:** Extract to single function, use DRY principle.

---

## Bug #4: Missing Error Handling

**Location:** `starter/index.js`
- Line 20: `const userId = parseInt(req.query.userId);` (no validation)
- Line 25: `const result = await processOrder(userId, orderData);` (no try/catch)
- Line 35: `const price = calculatePrice(items);` (no validation for empty array)

**Impact:**
- API crashes on invalid input
- No error messages for debugging
- Poor user experience

**How to Find:**
```bash
# Test with invalid input
curl "http://localhost:3000/api/order?userId=invalid"
```

**Fix:** Add input validation and error handling.

---

## Bug #5: Test File Never Runs

**Location:** `starter/test.js`
- File exists but is never executed
- No test script in package.json
- Tests are written but ignored

**Impact:**
- No confidence in code changes
- Bugs go undetected
- Manual testing required

**How to Find:**
```bash
# Check if tests run
npm test
# Should show "No tests found"
```

**Fix:** Add test script to package.json, fix test file structure.

---

## Summary

| Bug | Severity | Time to Fix | Cost if Unfixed |
|-----|----------|-------------|-----------------|
| TODO Comments | Medium | 2 hours | Security vulnerabilities |
| Dead Imports | Low | 5 minutes | Code confusion |
| Duplicated Logic | High | 1 hour | 3x maintenance cost |
| Missing Error Handling | High | 1 hour | Production crashes |
| Test File Never Runs | Medium | 30 minutes | No test coverage |

**Total Fix Time:** ~5 hours
**Total Cost if Unfixed:** $50k+ per year (for team of 3)

