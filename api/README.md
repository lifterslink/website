# Waitlist API Configuration

The waitlist form is currently set up to collect emails through a Vercel serverless function. To store the emails, you need to configure one of the following options:

## Option 1: Supabase (Recommended)
1. Create a Supabase project at https://supabase.com
2. Create a table called `waitlist` with an `email` column
3. Add your Supabase URL and API key as environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Update `api/waitlist.js` to use the Supabase client

## Option 2: Google Sheets
1. Create a Google Sheet
2. Use the Google Sheets API or a service like Sheety.co
3. Add API credentials as environment variables
4. Update the API endpoint in `api/waitlist.js`

## Option 3: Airtable
1. Create an Airtable base
2. Get your API key from Airtable
3. Add as environment variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
4. Update `api/waitlist.js` to use Airtable's API

## Option 4: Email Service (ConvertKit, Mailchimp, etc.)
1. Get API credentials from your email service
2. Add as environment variables
3. Update `api/waitlist.js` to use their API

## Testing Locally
Run `vercel dev` to test the serverless function locally.

## Current Setup
The function currently logs emails to the console. Replace the logging code in `api/waitlist.js` with your chosen storage solution.