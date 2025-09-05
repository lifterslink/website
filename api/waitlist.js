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
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    
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
      const error = await response.text();
      console.error('Airtable error:', error);
      
      // Check for duplicate email error
      if (response.status === 422 && error.includes('duplicate')) {
        return res.status(400).json({ 
          error: 'This email is already on the waitlist!' 
        });
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
    return res.status(500).json({ 
      error: 'Failed to add to waitlist. Please try again.' 
    });
  }
}