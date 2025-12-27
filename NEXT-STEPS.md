# Next Steps After Landing Page Deployment

Your landing page is live! Here's what to do next.

## ✅ What's Done

- ✅ Landing page deployed to Vercel
- ✅ Production URL: https://pragmatic-playbook-b4ql9wkoz-kypythons-projects.vercel.app
- ✅ All code pushed to GitHub: https://github.com/KyPython/pragmatic-playbook

---

## 🚀 Immediate Next Steps (Today)

### 1. Set Up Custom Domain (15 minutes)

**Goal:** Point `foundersinfra.com` to your Vercel deployment

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/kypythons-projects/pragmatic-playbook/settings)
2. Click **Settings** → **Domains**
3. Add `foundersinfra.com`
4. Add `www.foundersinfra.com`
5. Vercel will show DNS records to add:
   - **A Record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
6. Add these records in your domain registrar (GoDaddy, Namecheap, etc.)
7. Wait 5-10 minutes for DNS propagation
8. SSL certificate auto-provisioned (1-2 minutes)

**Result:** Your site will be live at `foundersinfra.com`

---

### 2. Configure HubSpot API Key (10 minutes)

**Goal:** Enable email signups to save to HubSpot

**Steps:**
1. Get HubSpot API key:
   - Go to [HubSpot Settings](https://app.hubspot.com/settings/integrations/api-key)
   - Create API key (or use existing)
   - Copy the key

2. Add to Vercel:
   - Go to [Vercel Project Settings](https://vercel.com/kypythons-projects/pragmatic-playbook/settings/environment-variables)
   - Click **Environment Variables**
   - Add:
     - **Name:** `HUBSPOT_API_KEY`
     - **Value:** `[your-api-key]`
     - **Environment:** Production, Preview, Development
   - Click **Save**

3. Redeploy:
   ```bash
   cd landing-page
   vercel --prod
   ```

**Result:** Email signups will save to HubSpot

---

### 3. Test Landing Page (5 minutes)

**Checklist:**
- [ ] Visit production URL
- [ ] Test email signup form
- [ ] Check all links work
- [ ] Test on mobile device
- [ ] Verify consulting services display correctly
- [ ] Test "Book a Call" button
- [ ] Check email signup saves to HubSpot (if configured)

**Test URL:** https://pragmatic-playbook-b4ql9wkoz-kypythons-projects.vercel.app

---

## 📧 This Week: Set Up Apollo Campaigns

### 4. Set Up Apollo (1 hour)

**Goal:** Launch cold email campaign to 30-50 prospects

**Steps:**
1. Follow: `apollo-campaigns/QUICK-START.md`
2. Create Apollo account
3. Verify domain: `foundersinfra.com`
4. Set sender: `founders@foundersinfra.com`
5. Create ICP list (Seed/Series A CTOs)
6. Import email sequences from `apollo-campaigns/07-apollo-import-ready-sequences.md`
7. Test with your email
8. Launch first 30-50 emails

**Expected Results:**
- 1-2 replies
- 1 qualified lead
- 0-1 booked call

**Full Guide:** `apollo-campaigns/04-apollo-workspace-setup.md`

---

## 🔗 Connect GitHub for Auto-Deploy (5 minutes)

**Goal:** Auto-deploy on every push

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/kypythons-projects/pragmatic-playbook/settings/git)
2. Click **Git** → **Connect Git Repository**
3. Select **GitHub**
4. Authorize Vercel
5. Select repository: `KyPython/pragmatic-playbook`
6. Set **Root Directory:** `landing-page`
7. Click **Deploy**

**Result:** Every push to `main` branch auto-deploys

---

## 📝 Deploy Blog Site (Optional - 15 minutes)

**Goal:** Publish blog posts

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import from GitHub: `KyPython/pragmatic-playbook`
4. Set **Root Directory:** `blog-site`
5. Deploy

**Result:** Blog site live at `blog-site.vercel.app` (or custom domain)

---

## 🎯 Marketing Launch Checklist

### Week 1
- [x] Landing page deployed
- [ ] Custom domain configured
- [ ] HubSpot API key set
- [ ] Email signup tested
- [ ] Apollo account created
- [ ] First 30-50 emails sent

### Week 2
- [ ] Track email campaign results
- [ ] Follow up on replies
- [ ] Book first consultation call
- [ ] Publish first blog post
- [ ] Share on social media

### Week 3-4
- [ ] Scale Apollo campaign (100+ emails)
- [ ] Optimize email sequences
- [ ] A/B test subject lines
- [ ] Refine ICP filters
- [ ] Track conversion metrics

---

## 📊 Key Metrics to Track

### Landing Page
- **Visits:**** Unique visitors per day
- **Signups:**** Email signups per day
- **Conversion Rate:**** Signups / Visits
- **Bounce Rate:**** Should be < 50%

### Apollo Campaign
- **Open Rate:**** Target 30-35%
- **Reply Rate:**** Target 3-5%
- **Qualified Leads:**** Target 1% of emails sent
- **Booked Calls:**** Target 0.5% of emails sent

### HubSpot
- **Contacts Added:**** New signups
- **Lifecycle Stage:**** Track progression
- **Email Engagement:**** Opens, clicks

---

## 🛠️ Quick Commands Reference

### Vercel
```bash
# Deploy to production
cd landing-page
vercel --prod

# View logs
vercel logs

# Inspect deployment
vercel inspect [deployment-url]
```

### Git
```bash
# Push changes (auto-deploys if connected)
git add .
git commit -m "Update landing page"
git push
```

### Testing
```bash
# Test locally
cd landing-page
npm run dev

# Build locally
npm run build
npm start
```

---

## 🆘 Troubleshooting

### Email Signup Not Working
- Check HubSpot API key is set in Vercel
- Check API key has correct permissions
- Check Vercel logs: `vercel logs`
- Test API endpoint directly

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify in Vercel dashboard
- Use [DNS Checker](https://dnschecker.org/)

### Build Fails
- Check Node.js version (need 18+)
- Run `npm install` locally
- Check for syntax errors
- Review Vercel build logs

---

## 📚 Documentation

- **Apollo Setup:** `apollo-campaigns/QUICK-START.md`
- **Framework Alignment:** `docs/05-framework-alignment.md`
- **Email Sequences:** `apollo-campaigns/07-apollo-import-ready-sequences.md`
- **Landing Page:** `landing-page/README.md`

---

## 🎉 You're Ready!

Your landing page is live and ready to capture leads. Next:
1. Set up custom domain
2. Configure HubSpot
3. Launch Apollo campaign
4. Start getting signups!

**Questions?** Check the documentation or review the code in the repo.

---

**Last Updated:** After initial deployment
**Next Review:** After first 50 emails sent

