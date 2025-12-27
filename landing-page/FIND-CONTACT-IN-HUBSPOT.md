# How to Find Your Contact in HubSpot

## Quick Search

1. **Go to HubSpot** → Contacts
2. **Search for your email:** `kyjahntsmith@gmail.com`
3. **Click on the contact** to view details

## If Contact Doesn't Appear

### Check Filters

HubSpot might be filtering contacts. Check:

1. **Lifecycle Stage Filter:**
   - Look for a filter dropdown at the top
   - Make sure "All lifecycle stages" is selected
   - Or specifically select "Subscriber"

2. **Contact Status:**
   - Check if there's a "Marketing contacts" vs "All contacts" toggle
   - Make sure you're viewing "All contacts"

3. **Search Instead of Browse:**
   - Use the search bar at the top
   - Type: `kyjahntsmith@gmail.com`
   - This will find the contact even if filters are hiding it

## Verify Contact Details

Once you find the contact, check:

1. **Email:** Should be `kyjahntsmith@gmail.com`
2. **First Name:** Should be `KyJahn`
3. **Last Name:** Should be `Smith`
4. **Lifecycle Stage:** Should be `subscriber`

## Check Email Sequence Status

1. **Open the contact** in HubSpot
2. **Scroll down** to see all properties
3. **Look for these properties:**
   - `scheduled_emails` - Should contain JSON with scheduled emails
   - `email_sequence` - Should be `foundersinfra-welcome`
   - `sequence_start_date` - Should show when you signed up

**If these properties don't exist:**
- The custom properties haven't been created yet
- See `AUTOMATED-EMAIL-SETUP.md` to create them
- The email sequence won't be scheduled until properties exist

## Why You're Getting HubSpot Notifications

The HubSpot notification you received means:
- ✅ HubSpot's embedded form tracking is working
- ✅ The form submission was recorded
- ✅ The contact exists in HubSpot

**But:** Our API might not be updating the contact properly, OR the contact exists but you need to search for it.

## Troubleshooting

### Contact Not Found

1. **Try searching by email** (not browsing)
2. **Check all lifecycle stages** (not just "Subscriber")
3. **Check if you're in the right HubSpot account** (Hub ID: 243698495)

### Email Sequence Not Scheduled

1. **Check if custom properties exist:**
   - Go to Settings → Properties → Contacts
   - Look for `scheduled_emails`, `email_sequence`, `sequence_start_date`
   - If they don't exist, create them (see `AUTOMATED-EMAIL-SETUP.md`)

2. **Check Vercel logs:**
   - Go to Vercel → Your Project → Functions → `/api/signup`
   - Look for recent signup
   - Check if `sequenceScheduled: true` or if there's an error

3. **Check cron job:**
   - Go to Vercel → Your Project → Crons
   - Verify `/api/cron/process-email-queue` is running hourly
   - Check logs for any errors

## Next Steps

1. ✅ **Find your contact** in HubSpot (search by email)
2. ✅ **Check if custom properties exist** (Settings → Properties)
3. ✅ **Create custom properties** if they don't exist
4. ✅ **Test signup again** after creating properties
5. ✅ **Verify email sequence is scheduled** in contact properties

---

**The contact IS in HubSpot** (the notification proves it). You just need to find it! 🔍

