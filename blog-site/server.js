const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('front-matter');

const app = express();
app.use(express.static('public'));

const BLOG_DIR = path.join(__dirname, '../blog');

// Configure marked for markdown rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

// Get all blog posts
function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      
      // Extract slug from filename (post-1-broken-windows.md -> broken-windows)
      const slug = file.replace(/^post-\d+-/, '').replace('.md', '');
      
      return {
        slug,
        title: parsed.attributes.title || slug.replace(/-/g, ' '),
        date: parsed.attributes.date || new Date().toISOString(),
        excerpt: parsed.attributes.excerpt || parsed.body.substring(0, 200) + '...',
        content: parsed.body,
        filename: file
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  
  return files;
}

// Homepage - List all blog posts
app.get('/', (req, res) => {
  const posts = getBlogPosts();
  const html = generateHomepage(posts);
  res.send(html);
});

// Individual blog post page
app.get('/post/:slug', (req, res) => {
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  
  if (!post) {
    return res.status(404).send('Post not found');
  }
  
  const html = generatePostPage(post, posts);
  res.send(html);
});

// Generate homepage HTML
function generateHomepage(posts) {
  const postsList = posts.map(post => `
    <article class="post-preview">
      <h2><a href="/post/${post.slug}">${post.title}</a></h2>
      <p class="post-meta">${formatDate(post.date)}</p>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="/post/${post.slug}" class="read-more">Read more →</a>
    </article>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Founder's Infrastructure Playbook - Blog</title>
    <style>${getStyles()}</style>
</head>
<body>
    <header>
        <div class="container">
            <h1><a href="/">The Founder's Infrastructure Playbook</a></h1>
            <nav>
                <a href="/">Blog</a>
                <a href="#about">About</a>
                <a href="#course">Course</a>
            </nav>
        </div>
    </header>
    
    <main class="container">
        <div class="hero">
            <h2>Learn to Build Production-Grade Infrastructure</h2>
            <p>Pragmatic Programmer principles applied to real startup challenges</p>
        </div>
        
        <div class="posts">
            ${postsList}
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} The Founder's Infrastructure Playbook</p>
        </div>
    </footer>
</body>
</html>
  `;
}

// Generate individual post page HTML
function generatePostPage(post, allPosts) {
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  
  const htmlContent = marked.parse(post.content);
  
  const navigation = `
    <div class="post-navigation">
      ${prevPost ? `<a href="/post/${prevPost.slug}" class="nav-link prev">← ${prevPost.title}</a>` : '<span></span>'}
      <a href="/" class="nav-link home">All Posts</a>
      ${nextPost ? `<a href="/post/${nextPost.slug}" class="nav-link next">${nextPost.title} →</a>` : '<span></span>'}
    </div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - The Founder's Infrastructure Playbook</title>
    <style>${getStyles()}</style>
</head>
<body>
    <header>
        <div class="container">
            <h1><a href="/">The Founder's Infrastructure Playbook</a></h1>
            <nav>
                <a href="/">Blog</a>
                <a href="#about">About</a>
                <a href="#course">Course</a>
            </nav>
        </div>
    </header>
    
    <main class="container">
        <article class="post">
            <header class="post-header">
                <h1>${post.title}</h1>
                <p class="post-meta">${formatDate(post.date)}</p>
            </header>
            
            <div class="post-content">
                ${htmlContent}
            </div>
            
            ${navigation}
        </article>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} The Founder's Infrastructure Playbook</p>
        </div>
    </footer>
</body>
</html>
  `;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// CSS Styles
function getStyles() {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    header h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    header h1 a {
      color: white;
      text-decoration: none;
    }

    header nav {
      display: flex;
      gap: 20px;
    }

    header nav a {
      color: white;
      text-decoration: none;
      opacity: 0.9;
      transition: opacity 0.3s;
    }

    header nav a:hover {
      opacity: 1;
    }

    main {
      background: white;
      min-height: calc(100vh - 200px);
      padding: 40px 20px;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .hero {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #f0f0f0;
    }

    .hero h2 {
      font-size: 32px;
      color: #667eea;
      margin-bottom: 10px;
    }

    .hero p {
      font-size: 18px;
      color: #666;
    }

    .posts {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .post-preview {
      padding: 20px;
      border-left: 4px solid #667eea;
      background: #fafafa;
      border-radius: 4px;
    }

    .post-preview h2 {
      margin-bottom: 10px;
    }

    .post-preview h2 a {
      color: #333;
      text-decoration: none;
      transition: color 0.3s;
    }

    .post-preview h2 a:hover {
      color: #667eea;
    }

    .post-meta {
      color: #999;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .post-excerpt {
      color: #666;
      margin-bottom: 15px;
    }

    .read-more {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .read-more:hover {
      text-decoration: underline;
    }

    .post {
      max-width: 700px;
      margin: 0 auto;
    }

    .post-header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    .post-header h1 {
      font-size: 36px;
      color: #333;
      margin-bottom: 10px;
    }

    .post-content {
      font-size: 18px;
      line-height: 1.8;
      color: #444;
    }

    .post-content h2 {
      font-size: 28px;
      color: #667eea;
      margin-top: 40px;
      margin-bottom: 20px;
    }

    .post-content h3 {
      font-size: 24px;
      color: #555;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .post-content p {
      margin-bottom: 20px;
    }

    .post-content code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 16px;
    }

    .post-content pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 20px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 20px 0;
    }

    .post-content pre code {
      background: none;
      padding: 0;
      color: inherit;
    }

    .post-content ul, .post-content ol {
      margin-left: 30px;
      margin-bottom: 20px;
    }

    .post-content li {
      margin-bottom: 10px;
    }

    .post-content blockquote {
      border-left: 4px solid #667eea;
      padding-left: 20px;
      margin: 20px 0;
      color: #666;
      font-style: italic;
    }

    .post-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px solid #f0f0f0;
    }

    .nav-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s;
    }

    .nav-link:hover {
      opacity: 0.7;
    }

    .nav-link.home {
      padding: 8px 16px;
      background: #667eea;
      color: white;
      border-radius: 4px;
    }

    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 20px 0;
      margin-top: 40px;
    }

    @media (max-width: 600px) {
      .post-navigation {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .post-header h1 {
        font-size: 28px;
      }

      .hero h2 {
        font-size: 24px;
      }
    }
  `;
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Blog server running on http://localhost:${PORT}`);
  console.log(`Blog posts directory: ${BLOG_DIR}`);
});

module.exports = app;

