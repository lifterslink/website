# Account Deletion Setup Guide

## What I've Built

✅ **Website Page**: Created `/delete-account.html` with a clean form matching your website design
✅ **iOS App Link**: Added "Delete Account" button in Settings → About section
✅ **Sitemap Updated**: Added page to sitemap.xml

## Next Steps to Complete Setup

### 1. Set Up Formspree (5 minutes)

The form needs to send to your email. Here's how to set it up:

1. **Go to Formspree**: https://formspree.io
2. **Sign up/Log in** (it's free for up to 50 submissions/month)
3. **Create a new form**:
   - Click "New Form"
   - Name it "Bia Account Deletion Requests"
   - Email: Your email where you want deletion requests sent
4. **Copy the form endpoint**: You'll get something like `https://formspree.io/f/xyzabc123`
5. **Update the HTML file**:

```bash
# Open the file
cd /Users/zhast/Documents/website
code public/delete-account.html

# Find this line (line 358):
<form id="deleteAccountForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

# Replace YOUR_FORM_ID with your actual Formspree ID:
<form id="deleteAccountForm" action="https://formspree.io/f/xyzabc123" method="POST">
```

### 2. Deploy Website to Vercel

```bash
cd /Users/zhast/Documents/website
npm run deploy
```

This will deploy the new delete-account page to buildingbia.com.

### 3. Commit & Push iOS App Changes

```bash
cd /Users/zhast/Documents/bia
git add -A
git commit -m "Add account deletion link to Settings

- Added 'Delete Account' option in Settings → About section
- Opens https://buildingbia.com/delete-account in Safari
- Complies with Apple App Store account deletion requirement

🤖 Generated with Claude Code
https://claude.com/claude-code

Co-Authored-By: Claude <noreply@anthropic.com>"
git push ios-app main
```

### 4. Build & Submit Updated App

1. Open Xcode
2. Product → Archive
3. Distribute to App Store Connect
4. Submit for review

**In App Review notes, add**:
> "Account deletion is now available in Settings → About → Delete Account. This opens a web page at https://buildingbia.com/delete-account where users can submit deletion requests, which are processed within 7 business days."

---

## Manual Deletion Process

When you receive a deletion request email from Formspree, follow these steps:

### Step 1: Verify User Identity
- Email provided: `user@example.com`
- Username (if provided): `@johndoe`

Check if the email matches their account:
```sql
SELECT id, email, username, apple_id
FROM user_profiles
WHERE email = 'user@example.com' OR apple_id = 'user@example.com' OR username = 'johndoe';
```

### Step 2: Delete All User Data

**Option A: Using Supabase Dashboard**
1. Go to Supabase → Table Editor
2. Find the user in `user_profiles` table
3. Click the row → Delete
4. **Cascade deletes** (if set up) will automatically delete:
   - Coach relationships (`coach_relationships`)
   - Following/followers (`follows`)
   - User's claimed athlete profile link

**Option B: Using SQL**
```sql
-- Get user ID first
SELECT id FROM user_profiles WHERE email = 'user@example.com';

-- Delete all associated data (do these in order)
DELETE FROM coach_relationships WHERE coach_id = 'USER_ID_HERE' OR athlete_id = 'USER_ID_HERE';
DELETE FROM follows WHERE follower_id = 'USER_ID_HERE' OR following_id = 'USER_ID_HERE';

-- Unclaim athlete profile
UPDATE user_profiles SET athlete_id = NULL WHERE id = 'USER_ID_HERE';

-- Finally, delete the user profile
DELETE FROM user_profiles WHERE id = 'USER_ID_HERE';
```

### Step 3: Send Confirmation Email

Reply to the deletion request email:

```
Subject: Bia Account Deletion - Completed

Hi,

Your Bia account has been permanently deleted. The following data has been removed:

✓ User profile and username
✓ Social connections (followers/following)
✓ Coach relationships
✓ Claimed athlete profiles

Your competition history from OpenPowerlifting remains publicly available as historical competition data.

If you have any questions, please don't hesitate to reach out.

Best,
Bia Team
```

---

## Important Notes

### What Gets Deleted
- ✅ User profile (email, username, settings)
- ✅ Social connections (followers, following)
- ✅ Coach relationships
- ✅ Claimed athlete profile link

### What Stays Public
- ❌ Competition results (OpenPowerlifting data)
  - This is historical, public competition data
  - It exists independently of Bia accounts
  - Users are informed of this in the deletion form

### Database Schema Notes

Make sure your Supabase tables have proper foreign key constraints with `ON DELETE CASCADE` so that deleting a user automatically deletes:
- Their coach relationships
- Their follower/following records
- Any other related data

If not set up, you'll need to manually delete each related record (as shown in Option B above).

---

## Testing

Before going live, test the flow:

1. **Test form submission**:
   - Go to https://buildingbia.com/delete-account
   - Fill out the form with a test email
   - Submit
   - Check that you receive the email

2. **Test iOS link**:
   - Open Bia app
   - Go to Settings
   - Tap "Delete Account"
   - Verify it opens Safari with the delete-account page

3. **Test deletion process**:
   - Create a test account in your database
   - Receive a "deletion request" for it
   - Follow the manual deletion steps
   - Verify all data is removed

---

## Apple App Review Response

When replying to the rejection:

> We have updated the app to include account deletion as requested. Users can now delete their account by:
>
> 1. Opening the app
> 2. Going to Settings (profile icon → gear icon)
> 3. Scrolling to the "About" section
> 4. Tapping "Delete Account"
>
> This opens https://buildingbia.com/delete-account where users can submit a deletion request. All requests are processed within 7 business days, and users receive email confirmation once their account is deleted.
>
> The deletion process permanently removes:
> - User profile and username
> - Social connections (followers/following)
> - Coach relationships
> - Claimed athlete profiles
>
> Competition history from OpenPowerlifting remains publicly available as it is historical, public competition data that exists independently of user accounts.
>
> Please let us know if you need any additional information.

---

## Future Automation (Optional)

If you get many deletion requests, you can automate this with a simple backend endpoint:

```python
# backend/bia_search_api.py
@app.function(...)
@modal.fastapi_endpoint(method="POST", label="bia-delete-account-request")
async def delete_account_request(email: str, username: Optional[str] = None):
    """Log deletion request and send admin notification"""

    # Find user
    user = await supabase.table("user_profiles")\
        .select("*")\
        .or_(f"email.eq.{email},apple_id.eq.{email}")\
        .execute()

    if not user.data:
        return {"success": False, "error": "Account not found"}

    user_id = user.data[0]["id"]

    # Send admin notification email
    # (use SendGrid, Resend, or similar)

    # Optionally: Mark account as "pending_deletion" for 7 days
    # Then auto-delete with a cron job

    return {"success": True, "message": "Deletion request received"}
```

But for now, manual processing is fine and Apple-compliant.
