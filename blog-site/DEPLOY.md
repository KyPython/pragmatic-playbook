# Deploy Your Blog Site

Your blog is ready to publish! Here are deployment options:

## Option 1: Vercel (Recommended - Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd blog-site
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project? No
   - Project name: pragmatic-playbook-blog
   - Directory: `./blog-site`
   - Override settings? No

4. **Your blog is live!** Vercel will give you a URL like `https://pragmatic-playbook-blog.vercel.app`

5. **Set custom domain (optional):**
   - Go to Vercel dashboard
   - Add your domain
   - Update DNS records

## Option 2: Railway (Free tier available)

1. **Connect GitHub:**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Select your repository

2. **Configure:**
   - Root Directory: `blog-site`
   - Build Command: (leave empty)
   - Start Command: `npm start`

3. **Deploy!** Railway auto-deploys on push

## Option 3: Heroku

1. **Install Heroku CLI:**
   ```bash
   npm i -g heroku
   ```

2. **Deploy:**
   ```bash
   cd blog-site
   heroku create your-blog-name
   git push heroku main
   ```

## Option 4: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd blog-site
   netlify deploy --prod
   ```

## After Deployment

1. **Test your blog:**
   - Visit your deployed URL
   - Click through posts
   - Verify navigation works

2. **Share your first post:**
   - Copy the URL: `https://your-domain.com/post/broken-windows`
   - Share on Twitter, LinkedIn, etc.

3. **Set up custom domain (optional):**
   - Add your domain in your hosting provider
   - Update DNS records
   - SSL certificate auto-provisioned

## Quick Test Locally

Before deploying, test locally:

```bash
cd blog-site
npm start
```

Visit `http://localhost:3002` to see your blog.

## Your First Post is Live!

Your first blog post "The Broken Windows Theory" is ready to publish at:
- Homepage: `https://your-domain.com/`
- Post URL: `https://your-domain.com/post/broken-windows`

