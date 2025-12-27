# Email Architecture

**See `README.md` for quick setup. See `EMAIL-SEQUENCE-SETUP.md` for step-by-step instructions.**

## Overview

**HubSpot**: Contact management (CRM) only  
**SendGrid**: All email sending (transactional + sequences)

## Quick Setup

### 1. HubSpot (Contact Management)

**Environment Variable:**
```bash
HUBSPOT_API_KEY=your_hubspot_api_key
```

**What it does:**
- Saves contacts to CRM
- Tracks source (landing page, URL, etc.)
- Stores custom properties
- Analytics and reporting

**Source Tracking Properties:**
- `hs_analytics_source`: `LANDING_PAGE`
- `hs_analytics_source_data_1`: `foundersinfra.com`
- `signup_source`: `Landing Page - Email Signup Form`
- `signup_url`: The URL they came from
- `signup_date`: Timestamp
- `marketing_source`: `foundersinfra.com`
- `lead_source`: `Landing Page`

**Setup Custom Properties in HubSpot:**
1. Go to Settings → Properties → Contacts
2. Create these properties:
   - `signup_source` (Single-line text)
   - `signup_url` (Single-line text)
   - `signup_date` (Date picker)
   - `marketing_source` (Single-line text)
   - `lead_source` (Single-line text)

### 2. SendGrid (Email Sending)

**Environment Variables:**
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com  # Optional, defaults to this
SENDGRID_FROM_NAME=Founders Infrastructure       # Optional, defaults to this
```

**API Key Name:** `Pragmatic Playbook` (in SendGrid dashboard)

**What it does:**
- Sends welcome emails immediately
- Handles all email delivery
- Better deliverability than HubSpot

**Domain Setup:**
1. Go to SendGrid → Settings → Sender Authentication
2. Add domain: `foundersinfra.com`
3. Add DNS records (CNAME records provided by SendGrid)
4. Verify domain (5-10 minutes)
5. Create sender: `founders@foundersinfra.com`
6. Verify sender email

## Architecture

```
Signup Form
    ↓
┌─────────────────────────────────────┐
│  Signup API (signup.js)             │
├─────────────────────────────────────┤
│  1. Save contact to HubSpot (CRM)   │
│  2. Send welcome email via SendGrid  │
│  3. Enroll in SendGrid sequences    │
└─────────────────────────────────────┘
    ↓
┌──────────────┐    ┌──────────────┐
│   HubSpot    │    │   SendGrid   │
│              │    │              │
│ • Contacts   │    │ • Welcome    │
│ • Source     │    │ • Sequences  │
│ • Analytics  │    │ • Tracking   │
└──────────────┘    └──────────────┘
```

## Responsibilities

### HubSpot (Contact Management)
- ✅ Save contacts to CRM
- ✅ Track source (landing page, URL, etc.)
- ✅ Store custom properties
- ✅ Analytics and reporting
- ❌ **NOT used for email sending**

### SendGrid (Email Sending)
- ✅ Welcome emails (immediate)
- ✅ Email sequences (automated)
- ✅ Transactional emails
- ✅ Email tracking (opens, clicks)
- ✅ Better deliverability

## Configuration

### HubSpot (Required for CRM)
```bash
HUBSPOT_API_KEY=your_hubspot_api_key
```

### SendGrid (Required for Emails)
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=founders@foundersinfra.com
SENDGRID_FROM_NAME=Founders Infrastructure
```

### Cron Job (Required for Email Sequences)
```bash
CRON_SECRET=your_random_secret_here  # Optional but recommended for securing cron endpoint
```

## Email Sequences

Email sequences are handled by **SendGrid**, not HubSpot workflows.

### Option 1: SendGrid Dynamic Templates
- Create templates in SendGrid
- Use SendGrid API to send scheduled emails
- Better control and deliverability

### Option 2: Your SaaS Email System
- Use your existing email worker
- Integrate with signup API
- Leverage your current infrastructure

### Option 3: Manual Sequences
- Send emails manually via SendGrid
- Use your email-sender scripts
- Full control over timing

## Benefits of This Architecture

1. **Separation of Concerns**
   - HubSpot = CRM
   - SendGrid = Email delivery

2. **Better Deliverability**
   - SendGrid optimized for email delivery
   - Your domain already configured

3. **Cost Effective**
   - HubSpot free tier for contacts
   - SendGrid free tier for emails (100/day)

4. **Flexibility**
   - Easy to switch email providers
   - HubSpot data stays intact
   - Use your existing SendGrid setup

## Data Flow

### When Someone Signs Up:

1. **Contact Saved to HubSpot**
   - Email, name, source tracking
   - Custom properties set
   - Available in CRM immediately

2. **Welcome Email Sent via SendGrid**
   - Immediate delivery
   - Styled HTML template
   - From: founders@foundersinfra.com

3. **Sequence Enrollment (Automatic)**
   - Email sequence scheduled in HubSpot
   - Processed hourly by Vercel cron job
   - Sent via SendGrid using your API key

## Next Steps

1. ✅ HubSpot configured (contact management)
2. ✅ SendGrid configured (email sending)
3. ✅ EasyFlow email worker configured (email sequences)
4. ⏳ Test end-to-end flow

---

**Clean separation: HubSpot = CRM, SendGrid = Email! 🎯**

