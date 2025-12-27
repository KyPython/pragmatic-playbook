const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../blog');

// Map of post slugs to titles and excerpts
const postMetadata = {
  'broken-windows': {
    title: 'The Broken Windows Theory: How $1 of Technical Debt Costs $5',
    excerpt: 'Last week, I inherited a codebase with 47 TODO comments. Not a big deal, right? Wrong. Those TODOs cost us $50,000 in the next 6 months.',
    date: '2025-01-15'
  },
  'tracer-bullets': {
    title: 'Tracer Bullets: Launch in 2 Weeks Instead of 3 Months',
    excerpt: 'I spent 3 months building the "perfect" feature. Users hated it. I should have shipped in 2 weeks and iterated.',
    date: '2025-01-16'
  },
  'dry-principle': {
    title: 'DRY: Why Code Duplication Costs 3x More',
    excerpt: 'I found the same discount calculation in 3 different files. When I needed to change it, I updated 2 files and forgot the third.',
    date: '2025-01-17'
  },
  'design-by-contract': {
    title: 'Design by Contract: Catch Bugs at the Edge',
    excerpt: 'Our API silently accepted negative balances. By the time we discovered it, 47 accounts had corrupted data.',
    date: '2025-01-18'
  },
  'error-handling': {
    title: 'Error Handling: From "Something Went Wrong" to Production Alerts',
    excerpt: 'Our API returned "Something went wrong" for every error. When production broke at 2 AM, we didn\'t know until users complained 8 hours later.',
    date: '2025-01-19'
  },
  'testing': {
    title: 'The Testing Pyramid: 70% Coverage in One Week',
    excerpt: 'We had 0 tests. Every deploy was a gamble. Then we implemented the testing pyramid and achieved 70% coverage in one week.',
    date: '2025-01-20'
  },
  'reversible-decisions': {
    title: 'Reversible Decisions: Deploy on Friday 5 PM Without Fear',
    excerpt: 'Our deployments took 1.5 hours. If something broke, rollback took hours. We only deployed on Monday mornings.',
    date: '2025-01-21'
  },
  'deployment': {
    title: 'Production Deployment: From Manual SSH to CI/CD',
    excerpt: 'We deployed by SSHing into servers. No CI/CD, no monitoring, no runbooks. When something broke, we didn\'t know until users complained.',
    date: '2025-01-22'
  },
  'scaling': {
    title: 'Scaling Your Team: 3x Faster Features Through Clean Architecture',
    excerpt: 'Our team grew from 2 to 8 developers. Feature development slowed from 2 weeks to 6 weeks. Then we refactored to clean architecture.',
    date: '2025-01-23'
  },
  'architecture': {
    title: 'Architecture Audit: 3.2x ROI in Year 1',
    excerpt: 'Our codebase had grown organically. We knew there were issues, but didn\'t know where to start. Then we ran an architecture audit.',
    date: '2025-01-24'
  }
};

// Process all blog posts
const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has front matter
  if (content.startsWith('---')) {
    console.log(`✓ ${file} already has front matter`);
    return;
  }
  
  // Extract slug from filename
  const slug = file.replace(/^post-\d+-/, '').replace('.md', '');
  const metadata = postMetadata[slug];
  
  if (!metadata) {
    console.log(`⚠️  No metadata for ${file}, skipping`);
    return;
  }
  
  // Add front matter
  const frontMatter = `---
title: ${metadata.title}
date: ${metadata.date}
excerpt: ${metadata.excerpt}
---

`;
  
  const newContent = frontMatter + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Added front matter to ${file}`);
});

console.log('\n✅ Done! All blog posts have front matter.');

