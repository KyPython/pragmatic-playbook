# Email Architecture

## Overview

**HubSpot**: Contact management (CRM) only  
**SendGrid**: All email sending (transactional + sequences)

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

3. **Sequence Enrollment (Your Choice)**
   - Option A: SendGrid dynamic templates
   - Option B: Your email worker system
   - Option C: Manual sending

## Next Steps

1. ✅ HubSpot configured (contact management)
2. ✅ SendGrid configured (email sending)
3. ⏳ Set up email sequences (your choice of method)
4. ⏳ Test end-to-end flow

---

**Clean separation: HubSpot = CRM, SendGrid = Email! 🎯**

