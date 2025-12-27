# Deploy Landing Page to Vercel

## Quick Deploy (2 Minutes)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Deploy

```bash
cd landing-page
vercel
```

Follow the prompts:
- **Link to existing project?** No
- **Project name:** foundersinfra-landing
- **Directory:** `./` (current directory)
- **Override settings?** No

### Step 3: Set Custom Domain

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Add `foundersinfra.com`
5. Update DNS records as shown
6. Wait for SSL certificate (automatic)

## Alternative: Deploy via GitHub

1. **Push to GitHub:**
   ```bash
   git add landing-page/
   git commit -m "Add landing page"
   git push
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select repository
   - Set root directory: `landing-page`
   - Deploy!

## Verify Deployment

1. Visit your Vercel URL (e.g., `foundersinfra-landing.vercel.app`)
2. Check all links work
3. Test on mobile
4. Verify CTA buttons point to `foundersinfra.com`

## Custom Domain Setup

### DNS Records

Add these DNS records to your domain provider:

**For Apex Domain (foundersinfra.com):**
- Type: A
- Name: @
- Value: 76.76.21.21 (Vercel's IP)

**For WWW (www.foundersinfra.com):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### Vercel Settings

1. Go to project settings → Domains
2. Add `foundersinfra.com`
3. Add `www.foundersinfra.com`
4. Vercel will verify DNS
5. SSL certificate auto-provisioned (takes 1-2 minutes)

## Testing Locally

```bash
cd landing-page
npm install
npm run dev
```

Visit `http://localhost:3000`

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### Build Fails
- Check Node.js version (need 18+)
- Run `npm install` again
- Check for syntax errors

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify in Vercel dashboard

### Links Not Working
- Check all links point to `foundersinfra.com`
- Test in browser console for errors
- Verify Next.js routing

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up custom domain
3. ✅ Test all functionality
4. ✅ Share the URL!

Your landing page is live at `foundersinfra.com`! 🎉

