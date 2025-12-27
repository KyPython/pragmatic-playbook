# The Founder's Infrastructure Playbook

> An 8-week course on Pragmatic Programmer principles with 10 hands-on coding projects

## 🎯 Mission

Learn to build production-grade infrastructure that scales with your startup. Each project teaches a core principle from "The Pragmatic Programmer" through real, buggy code that you'll fix and refactor.

## 📚 Course Structure

### Week 1-2: Foundation
- **Project 1: Broken Windows** - Technical debt detection and cost calculation
- **Project 2: Tracer Bullets** - MVP velocity and feature prioritization

### Week 3-4: Code Quality
- **Project 3: DRY Refactor** - Eliminating code duplication
- **Project 4: Design by Contract** - Precondition checks and crash-early philosophy

### Week 5-6: Reliability
- **Project 5: Error Handling** - 3-tier error handling (dev/staging/production)
- **Project 6: Testing Pyramid** - Unit, integration, and E2E testing strategies

### Week 7-8: Production
- **Project 7: Reversible Decisions** - Feature flags and safe deployment patterns
- **Project 8: Advanced Patterns** - Clean architecture and decoupling
- **Project 9: Deployment Strategies** - CI/CD, monitoring, and runbooks
- **Project 10: Architecture Audit** - 90-day improvement plan with metrics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd pragmatic-playbook

# Install dependencies and setup all projects
npm run setup

# Run all tests
npm run test

# Build for production
npm run build
```

### Working on a Project

Each project has two versions:
- **`starter/`** - Buggy code with issues to fix
- **`solution/`** - Production-ready reference implementation

```bash
# Navigate to a project
cd projects/01-broken-windows

# Work on the starter code
cd starter
npm install
npm test

# Compare with solution
cd ../solution
npm install
npm test
```

## 📝 Blog Site

We've included a production-ready blog site that automatically renders your markdown blog posts:

```bash
cd blog-site
npm install
npm start
```

Visit `http://localhost:3002` to see your blog.

See [blog-site/README.md](./blog-site/README.md) for full setup and [blog-site/DEPLOY.md](./blog-site/DEPLOY.md) for deployment instructions.

## 📧 Email Signup

We've included a production-ready email signup form with HubSpot integration:

```bash
cd email-signup
cp .env.example .env
# Edit .env and add your HubSpot API key
npm install
npm start
```

Visit `http://localhost:3001` to see the signup form.

See [email-signup/README.md](./email-signup/README.md) for full setup instructions.

## 📁 Repository Structure

```
pragmatic-playbook/
├── projects/          # 10 hands-on coding projects
├── docs/              # Course curriculum and documentation
├── blog/              # 10 blog posts (ready to publish)
├── emails/            # Email sequences for marketing
├── templates/         # Audit checklists and action plans
├── scripts/           # Setup, test, and build scripts
└── email-signup/      # Email signup form with HubSpot integration
```

## 🎓 Learning Approach

1. **Read the README** - Understand the problem and why it matters
2. **Study the starter code** - Identify bugs and antipatterns
3. **Fix the issues** - Apply the principle to create clean code
4. **Compare with solution** - Learn from the reference implementation
5. **Run tests** - Verify your solution works correctly

## 📊 Expected Outcomes

After completing this course, you'll be able to:

- **Detect technical debt** before it becomes expensive
- **Build MVPs** in 2 weeks instead of 3 months
- **Refactor safely** with confidence through testing
- **Deploy fearlessly** on Friday at 5 PM
- **Scale your team** without breaking existing features

## 🔧 Available Scripts

- `npm run setup` - Initialize all projects and install dependencies
- `npm run test` - Run all project tests
- `npm run build` - Prepare all projects for deployment
- `npm run lint` - Lint all code
- `npm run format` - Format all code with Prettier

## 📖 Documentation

- [Course Curriculum](./docs/01-course-curriculum.md)
- [Consulting Services](./docs/02-consulting-services.md)
- [Sales Copy](./docs/03-sales-copy.md)
- [Project Mapping](./docs/04-project-mapping.md)
- [Complete Monetization Strategy](./docs/pragmatic_complete.md)

## 🤝 Contributing

This is a course repository. If you find bugs or have suggestions, please open an issue.

## 📄 License

MIT

---

**Ready to start?** Navigate to `projects/01-broken-windows` and begin your journey!
