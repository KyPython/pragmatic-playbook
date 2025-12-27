# Blog Site for The Founder's Infrastructure Playbook

A simple, production-ready blog site that automatically renders markdown blog posts from the `/blog` directory.

## Features

- ✅ Automatic blog post discovery from markdown files
- ✅ Beautiful, responsive design
- ✅ Markdown rendering with syntax highlighting
- ✅ Post navigation (previous/next)
- ✅ SEO-friendly URLs
- ✅ Ready to deploy

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Visit `http://localhost:3002` to see your blog.

## Blog Post Format

Blog posts should be in `/blog` directory with front matter:

```markdown
---
title: Your Post Title
date: 2025-01-15
excerpt: A short excerpt for the homepage
---

# Your Post Title

Your content here...
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `blog-site` directory
3. Set root directory to `blog-site` in Vercel dashboard

### Deploy to Railway

1. Connect your GitHub repo
2. Set root directory to `blog-site`
3. Deploy!

### Deploy to Heroku

```bash
heroku create your-blog-name
git push heroku main
```

## Customization

### Change Port

Set `PORT` environment variable:
```bash
PORT=8080 npm start
```

### Modify Styles

Edit the `getStyles()` function in `server.js` to customize colors, fonts, and layout.

### Add More Pages

Add routes in `server.js`:
```javascript
app.get('/about', (req, res) => {
  res.send(generateAboutPage());
});
```

## Blog Post URLs

Posts are accessible at:
- `/post/broken-windows` (from `post-1-broken-windows.md`)
- `/post/tracer-bullets` (from `post-2-tracer-bullets.md`)
- etc.

The slug is automatically extracted from the filename.

