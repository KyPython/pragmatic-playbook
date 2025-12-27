# Project Mapping: Principles to Projects

## Mapping Table

| Principle | Project | Key Learning | Time Impact | Cost Impact |
|-----------|---------|--------------|-------------|-------------|
| **Broken Windows** | 01-broken-windows | Technical debt detection | Catch issues early | $1 debt = $3-5 future cost |
| **Tracer Bullets** | 02-tracer-bullets | MVP velocity | 2 weeks vs 3 months | Faster time-to-market |
| **DRY** | 03-dry-refactor | Code duplication | Change once, works everywhere | Reduced maintenance |
| **Design by Contract** | 04-design-by-contract | Precondition validation | Catch bugs at edge | Prevent data corruption |
| **Error Handling** | 05-error-handling | Structured errors | < 2 min alerts | Faster incident response |
| **Testing Pyramid** | 06-testing-pyramid | Test strategy | 70% coverage in 1 week | 60% fewer bugs |
| **Reversible Decisions** | 07-reversible-decisions | Feature flags | 8 min deploy, 2 min rollback | Safe deployments |
| **Orthogonal Design** | 08-advanced-patterns | Decoupling | 3x faster features | Reduced coupling costs |
| **Deployment** | 09-deployment-strategies | CI/CD + monitoring | Deploy Friday 5 PM | Automated workflows |
| **Architecture Audit** | 10-architecture-audit | 90-day plan | Measurable improvements | 3.2x ROI Year 1 |

## Learning Progression

### Beginner Track (Projects 1-4)
**Focus:** Foundation and code quality
- Detect and fix obvious issues
- Build working MVPs quickly
- Eliminate duplication
- Validate inputs

**Time:** 20-28 hours
**Outcome:** Clean, working codebase

### Intermediate Track (Projects 5-6)
**Focus:** Reliability and testing
- Handle errors gracefully
- Write comprehensive tests
- Achieve high coverage
- Automate testing

**Time:** 14-18 hours
**Outcome:** Reliable, tested systems

### Advanced Track (Projects 7-10)
**Focus:** Production excellence
- Safe deployment patterns
- Clean architecture
- CI/CD and monitoring
- Strategic improvements

**Time:** 36-50 hours
**Outcome:** Production-grade infrastructure

## Skill Development Matrix

| Skill | Projects | Mastery Level |
|-------|----------|---------------|
| **Code Review** | 1, 3, 8 | Advanced |
| **Refactoring** | 1, 3, 8 | Advanced |
| **Testing** | 6 | Advanced |
| **Error Handling** | 5 | Advanced |
| **Deployment** | 7, 9 | Advanced |
| **Architecture** | 8, 10 | Advanced |
| **MVP Development** | 2 | Intermediate |
| **Contract Design** | 4 | Intermediate |

## Project Dependencies

```
Project 1 (Broken Windows)
  └─> Project 3 (DRY Refactor) - uses debt detection
  └─> Project 10 (Architecture Audit) - uses audit skills

Project 2 (Tracer Bullets)
  └─> Project 9 (Deployment) - deploys MVP

Project 4 (Design by Contract)
  └─> Project 5 (Error Handling) - validates inputs

Project 6 (Testing Pyramid)
  └─> Project 7 (Reversible Decisions) - tests feature flags
  └─> Project 9 (Deployment) - tests in CI/CD

Project 8 (Advanced Patterns)
  └─> Project 10 (Architecture Audit) - audits architecture
```

## Recommended Learning Paths

### Fast Track (4 weeks)
- Week 1: Projects 1, 2
- Week 2: Projects 3, 4
- Week 3: Projects 5, 6
- Week 4: Projects 7, 9

**Best for:** Founders who need quick wins

### Standard Track (8 weeks)
- Follow the full curriculum
- One project per week (Projects 1-8)
- Two weeks for Projects 9-10

**Best for:** Comprehensive learning

### Deep Dive (12 weeks)
- Standard track + implementation
- Apply each principle to your codebase
- Complete architecture audit

**Best for:** Complete transformation

## Assessment Criteria

### Project 1-5: Fix Bugs
- Identify all bugs in starter code
- Fix bugs correctly
- Tests pass
- Code is clean and readable

### Project 6-10: Implement Solutions
- Implement from requirements
- Follow best practices
- Tests pass
- Production-ready code

### Final Project: Architecture Audit
- Complete audit of your codebase
- 90-day improvement plan
- ROI calculations
- Prioritized action items

## Success Metrics

### Individual Projects
- ✅ All tests pass
- ✅ Code follows best practices
- ✅ README is clear and complete
- ✅ Solution matches reference implementation

### Course Completion
- ✅ All 10 projects completed
- ✅ Architecture audit delivered
- ✅ 90-day plan created
- ✅ Reflection written for each project

## Resources Per Project

Each project includes:
- **README.md** - Problem statement, solution, learning outcomes
- **starter/** - Buggy code to fix
- **solution/** - Reference implementation
- **tests/** - Test suite
- **package.json** - Dependencies and scripts

## Next Steps After Completion

1. **Apply to Your Codebase**
   - Run architecture audit on your project
   - Create 90-day improvement plan
   - Start with highest ROI items

2. **Share with Team**
   - Use blog posts for team training
   - Implement principles in code reviews
   - Create team standards

3. **Continue Learning**
   - Read "The Pragmatic Programmer"
   - Join community discussions
   - Share your improvements

