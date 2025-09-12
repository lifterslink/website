# Waitlist API Configuration

The waitlist form is integrated with Airtable to store email signups.

## Airtable Setup Instructions

### 1. Create Your Airtable Base

1. Log into Airtable and create a new base called "Lifters Link Waitlist"
2. Create a table called "Waitlist" with these fields:
   - **Email** (Email field type) - Primary field
   - **Signup Date** (Date & time field)
   - **Source** (Single line text) - Default: "Website"
   - **Status** (Single select) - Options: Pending, Confirmed, Contacted
   - **Notes** (Long text) - Optional

### 2. Get Your API Credentials

1. **API Key**: Already provided (starts with `pat...`)
2. **Base ID**: 
   - Go to [Airtable API](https://airtable.com/api)
   - Select your base
   - Find the Base ID in the URL or introduction (starts with `app`)

### 3. Add Environment Variables to Vercel

```bash
# Using Vercel CLI
vercel env add AIRTABLE_API_KEY
vercel env add AIRTABLE_BASE_ID
vercel env add AIRTABLE_TABLE_NAME

# Or add through Vercel Dashboard:
# Settings > Environment Variables
```

Add these values:
- `AIRTABLE_API_KEY`: Your API key (pat...)
- `AIRTABLE_BASE_ID`: Your base ID (app...)
- `AIRTABLE_TABLE_NAME`: Waitlist (or your table name)

### 4. Deploy

```bash
# Deploy to production with new env vars
vercel --prod
```

## Local Development

For local testing, create a `.env.local` file:

```env
AIRTABLE_API_KEY=patIgbHo2CwvX8VHp.6f75e1d2815a0799b174d9bdeb72d0281e2103d0782a85d9e2efc0aca07e8d12
AIRTABLE_BASE_ID=appYourBaseID
AIRTABLE_TABLE_NAME=Waitlist
```

Then run:
```bash
vercel dev
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Successfully added to waitlist!"
}
```

### Error Responses
```json
{
  "error": "Invalid email address"
}
// or
{
  "error": "This email is already on the waitlist!"
}
// or
{
  "error": "Failed to add to waitlist. Please try again."
}
```

## Airtable Features Used

- **Email validation**: Checks for valid email format
- **Duplicate detection**: Returns error if email exists
- **Timestamp tracking**: Automatically records signup date
- **Source tracking**: Identifies signups from website
- **Status management**: Track follow-up status

## Viewing Your Waitlist

1. Open your Airtable base
2. All signups appear in real-time
3. Use Airtable's features:
   - Sort by signup date
   - Filter by status
   - Export to CSV
   - Create views for different segments
   - Set up automations for welcome emails

## Troubleshooting

### Common Issues

1. **"Failed to add to waitlist"**
   - Check API key is correct
   - Verify Base ID matches your base
   - Ensure table name is correct

2. **"This email is already on the waitlist"**
   - Working as intended
   - Check Airtable for the existing record

3. **No records appearing**
   - Verify environment variables in Vercel
   - Check Vercel function logs
   - Ensure deployment includes latest code

### Debug Mode

If Airtable is not configured, the API operates in development mode:
- Emails are logged to console
- Returns success response
- No data is persisted

## Security Notes

- API key is stored as environment variable (never in code)
- CORS is configured for browser requests
- Email validation prevents invalid submissions
- Rate limiting handled by Vercel