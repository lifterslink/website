# Airtable Setup Guide for Lifters Link Waitlist

## ⚠️ Important: Complete These Steps First!

The error you're seeing means the Airtable table doesn't exist yet. Follow these steps exactly:

## Step 1: Create Your Airtable Table

1. **Log into Airtable** at [airtable.com](https://airtable.com)

2. **Open your base** with ID: `appdlFtFZ1Th6ALxh`
   - Or create a new base if you haven't already

3. **Create a new table** named exactly: `Waitlist`
   - ⚠️ The name must be EXACTLY "Waitlist" (capital W)

4. **Add these fields** (in this exact order):
   
   | Field Name | Field Type | Notes |
   |------------|------------|-------|
   | Email | Email | This should be the primary field |
   | Signup Date | Date (include time) | Will store when they signed up |
   | Source | Single line text | Will always be "Website" |
   | Status | Single select | Add options: Pending, Confirmed, Contacted |

## Step 2: Configure Field Settings

### For the Email field:
- Click the field dropdown → "Edit field"
- Make sure type is "Email"
- You can enable "Do not allow duplicate values" if you want

### For the Signup Date field:
- Click the field dropdown → "Edit field"  
- Set type to "Date"
- Toggle ON "Include time"
- Set date format to your preference
- Set time format to 12h or 24h

### For the Status field:
- Click the field dropdown → "Edit field"
- Set type to "Single select"
- Add these options:
  - Pending (gray or yellow)
  - Confirmed (green)
  - Contacted (blue)

## Step 3: Verify Your API Token Permissions

Your token needs these scopes:
- `data.records:write` - To create new records
- `data.records:read` - To check for duplicates (optional)

To check/create a token:
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Create a new token with:
   - Name: "Lifters Link Website"
   - Scope: `data.records:write`
   - Access: Your base (appdlFtFZ1Th6ALxh)

## Step 4: Test Your Setup

### Option A: Test with curl
```bash
curl -X POST "https://api.airtable.com/v0/appdlFtFZ1Th6ALxh/Waitlist" \
  -H "Authorization: Bearer patIgbHo2CwvX8VHp.6f75e1d2815a0799b174d9bdeb72d0281e2103d0782a85d9e2efc0aca07e8d12" \
  -H "Content-Type: application/json" \
  -d '{
    "records": [{
      "fields": {
        "Email": "test@example.com",
        "Signup Date": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
        "Source": "Website",
        "Status": "Pending"
      }
    }]
  }'
```

### Option B: Test locally
```bash
# Make sure you have the .env.local file
vercel dev
# Then try submitting an email through the form
```

## Step 5: Deploy to Production

Once the table is created and working:

```bash
# Deploy with the configured environment variables
vercel --prod
```

## Troubleshooting

### "Invalid permissions or model not found"
- ✅ Make sure table is named exactly "Waitlist"
- ✅ Check that all 4 fields exist with correct names
- ✅ Verify your API token has write permissions

### "Field validation error"
- Check field names match exactly (case-sensitive)
- Make sure "Signup Date" has time enabled
- Ensure "Status" has the option "Pending"

### Still not working?
The API is configured to:
1. Log emails to Vercel logs even if Airtable fails
2. Return success to users to not lose signups
3. You can check logs at: [vercel.com/your-project/functions](https://vercel.com/dashboard)

## Alternative: Quick Table Creation

If you want to start fresh:
1. Create a new table from template
2. Use this Airtable formula to create the structure:
   - Go to your base
   - Add a new table
   - Choose "Start from scratch"
   - Name it "Waitlist"
   - Add the 4 fields listed above

## 📧 Backup: Check Vercel Logs

Even if Airtable fails, emails are logged. Check them at:
- Vercel Dashboard → Functions → Logs
- Look for "WAITLIST SIGNUP" entries

---

## ✅ Checklist

- [ ] Created table named "Waitlist" in Airtable
- [ ] Added all 4 fields with correct types
- [ ] Verified API token has write permissions
- [ ] Tested with a sample email
- [ ] Deployed to production

Once all items are checked, your waitlist will be fully operational!