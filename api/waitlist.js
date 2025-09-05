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

  try {
    // Here you can integrate with your preferred email service
    // Options:
    // 1. Send to a database (Supabase, Planetscale, etc.)
    // 2. Send to an email service (SendGrid, Mailchimp, ConvertKit)
    // 3. Send to a Google Sheet via API
    // 4. Send to Airtable
    
    // For now, we'll just log it and return success
    // In production, replace this with your actual storage solution
    console.log('New waitlist signup:', email);
    
    // Example: Send to a webhook or external service
    // const response = await fetch('YOUR_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, timestamp: new Date().toISOString() })
    // });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully added to waitlist' 
    });
    
  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    return res.status(500).json({ error: 'Failed to process signup' });
  }
}