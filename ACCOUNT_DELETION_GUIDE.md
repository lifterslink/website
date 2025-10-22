# Account Deletion - Simple Email Setup

## ✅ What's Built

**Website Page**: `/delete-account.html` with a simple mailto link
**iOS App**: "Delete Account" button in Settings → About
**How it works**: User clicks button → Email app opens with pre-filled request → They send it to you

**Zero infrastructure needed** - just regular email!

---

## 🚀 Next Steps (10 minutes)

### 1. Deploy Website (2 minutes)
```bash
cd /Users/zhast/Documents/website
npm run deploy
```

This deploys to `https://buildingbia.com/delete-account`

### 2. Test the Flow (3 minutes)
1. **Open the page**: Go to https://buildingbia.com/delete-account
2. **Click "Delete My Account"**: Should open your email app
3. **Check the pre-filled email**: Subject and body should be filled out
4. **Test from iPhone**: Settings → Delete Account → Opens in Safari → Click button

### 3. Submit Updated iOS App (5 minutes)
The iOS app changes are already committed and pushed.

1. Open Xcode
2. Product → Archive
3. Distribute to App Store Connect
4. **In App Review notes**, add:

> Account deletion is now available in Settings → About → Delete Account. This opens https://buildingbia.com/delete-account where users can send a deletion request email. All requests are processed within 7 business days.

---

## 📧 Processing Deletion Requests

When you receive a deletion request email:

### Step 1: Verify User
Email says: "Email or Apple ID: user@example.com"

Check Supabase:
```sql
SELECT id, email, username, apple_id
FROM user_profiles
WHERE email = 'user@example.com' OR apple_id = 'user@example.com';
```

### Step 2: Delete Their Data

**Easiest way** (Supabase Dashboard):
1. Go to Supabase → Table Editor → `user_profiles`
2. Find the user
3. Click the row → Delete
4. Done! (Cascade deletes handle related data)

**Or via SQL**:
```sql
-- Get user ID first
SELECT id FROM user_profiles WHERE email = 'user@example.com';

-- Delete all data (do in order)
DELETE FROM coach_relationships WHERE coach_id = 'USER_ID' OR athlete_id = 'USER_ID';
DELETE FROM follows WHERE follower_id = 'USER_ID' OR following_id = 'USER_ID';
UPDATE user_profiles SET athlete_id = NULL WHERE id = 'USER_ID';
DELETE FROM user_profiles WHERE id = 'USER_ID';
```

### Step 3: Reply to Confirm

```
Subject: Re: Account Deletion Request

Hi,

Your Bia account has been permanently deleted. The following data has been removed:

✓ User profile and username
✓ Social connections (followers/following)
✓ Coach relationships
✓ Claimed athlete profiles

Your competition history from OpenPowerlifting remains publicly available as historical competition data.

Thanks for being part of Bia.

Best,
Bia Team
```

---

## ✉️ Reply to App Review

After deploying:

> We have updated the app to include account deletion. Users can now delete their account by:
>
> 1. Opening Settings → About
> 2. Tapping "Delete Account"
> 3. Clicking "Delete My Account" which opens their email app with a pre-filled deletion request
>
> Users send the email to support@buildingbia.com and we process all deletion requests within 7 business days with email confirmation.

---

## What Gets Deleted vs. What Stays

### Deleted ✓
- User profile (email, username, settings)
- Social connections (followers, following)
- Coach relationships
- Claimed athlete profile link

### Stays Public ✗
- Competition results (OpenPowerlifting data)
  - This is historical, public data
  - Exists independently of Bia accounts
  - Users are informed of this on the deletion page

---

## That's It!

**No Formspree needed**
**No backend API needed**
**Just email** - the simplest solution that's fully Apple-compliant!
