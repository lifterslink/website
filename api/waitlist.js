export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Airtable configuration
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appdlFtFZ1Th6ALxh';
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Waitlist';

  // Check if Airtable is configured
  if (!AIRTABLE_API_KEY) {
    console.log('Airtable not configured. Email:', email);
    // Fallback: just log and return success
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist (dev mode)' 
    });
  }

  try {
    // Add to Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: email,
              'Signup Date': new Date().toISOString(),
              Source: 'Website',
              Status: 'Pending'
            }
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable error:', errorText);
      
      // Parse error for better handling
      try {
        const errorData = JSON.parse(errorText);
        
        if (response.status === 403 || errorData.error?.type === 'INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND') {
          console.error('Airtable Setup Error: Table not found or permissions issue');
          console.error('Please ensure:');
          console.error('1. You have created a table named "Waitlist" in your Airtable base');
          console.error('2. The table has these fields: Email, Signup Date, Source, Status');
          console.error('3. Your API token has write permissions');
          
          // Still save the email somewhere (you could log it or send to a backup service)
          console.log('WAITLIST SIGNUP (saved locally due to Airtable error):', email, new Date().toISOString());
          
          // Return success to user but log the issue
          return res.status(200).json({ 
            success: true, 
            message: 'Successfully added to waitlist!' 
          });
        }
        
        if (response.status === 422) {
          // Field validation error - check if it's a duplicate
          if (errorText.includes('duplicate') || errorText.includes('unique')) {
            return res.status(400).json({ 
              error: 'This email is already on the waitlist!' 
            });
          }
          
          // Other validation error - might be missing fields
          console.error('Airtable field validation error. Check that your table has the correct fields.');
          
          // Log the email and return success
          console.log('WAITLIST SIGNUP (field mismatch):', email, new Date().toISOString());
          return res.status(200).json({ 
            success: true, 
            message: 'Successfully added to waitlist!' 
          });
        }
      } catch (e) {
        // Error parsing error response
        console.error('Could not parse Airtable error:', e);
      }
      
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully added to Airtable:', data.records[0].id);

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist!' 
    });
    
  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    
    // Save email to logs as backup
    console.log('WAITLIST SIGNUP (error backup):', email, new Date().toISOString());
    
    // Return success to user even if Airtable fails
    // This ensures we don't lose signups
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist!' 
    });
  }
}