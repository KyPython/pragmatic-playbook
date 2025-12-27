# Project 6: Testing Pyramid

## The Problem

Your codebase has 0 tests. You manually test before every deploy, but bugs still slip through. When you try to add tests, you write 20 E2E tests that take 30 minutes to run. Every small change requires running all tests.

## Why It Matters

The **Testing Pyramid** principle says:
- **Many unit tests** (fast, isolated, easy to write)
- **Some integration tests** (test modules together)
- **Few E2E tests** (test critical user flows)

**Real Impact:**
- **70% coverage in one week** - Not months
- **Tests run in seconds** - Not minutes
- **Confidence in changes** - Know immediately if you broke something
- **60% fewer bugs** - Catch issues before production

**Cost of No Tests:**
- Manual testing: Hours before every deploy
- Production bugs: Discovered by users
- Fear of changes: "If it works, don't touch it"
- Debugging time: Hours to find root cause

## Learning Objectives

By completing this project, you'll learn to:
1. Write effective unit tests
2. Design integration tests
3. Implement E2E tests for critical paths
4. Achieve 70%+ test coverage
5. Understand test pyramid vs iceberg antipattern

## The Starter Code

The `starter/` folder contains:
- 0 tests
- Manual testing before deploy
- No test infrastructure
- No confidence in changes

## Your Mission

1. **Write 20 unit tests** - Fast, isolated tests
2. **Write 5 integration tests** - Test modules together
3. **Write 2 E2E tests** - Test critical user flows
4. **Achieve 70%+ coverage** - Measure your progress
5. **Compare with solution** to see the pyramid in action

## Expected Outcomes

After implementing the testing pyramid, you'll have:
- ✅ 20+ unit tests (run in < 5 seconds)
- ✅ 5+ integration tests (run in < 30 seconds)
- ✅ 2+ E2E tests (run in < 2 minutes)
- ✅ 70%+ test coverage
- ✅ CI/CD ready (tests run automatically)

## Getting Started

```bash
# Navigate to this project
cd projects/06-testing-pyramid

# Install dependencies
npm install

# Run all tests
npm test

# Run by type
npm run test:unit
npm run test:integration
npm run test:e2e

# Check coverage
npm run test:coverage
```

## Coverage Impact

**Before:**
- Test coverage: 0%
- Manual testing: 2 hours before deploy
- Production bugs: 5-10 per month
- Confidence: Low (afraid to change code)

**After:**
- Test coverage: 70%+
- Automated testing: 2 minutes
- Production bugs: 1-2 per month (60% reduction)
- Confidence: High (tests catch issues immediately)

**ROI:** 60% fewer bugs, 10x faster testing, deploy with confidence

## Next Steps

After completing this project:
1. Add tests to your own codebase
2. Set up CI/CD to run tests automatically
3. Aim for 70%+ coverage
4. Move to Project 7: Reversible Decisions

