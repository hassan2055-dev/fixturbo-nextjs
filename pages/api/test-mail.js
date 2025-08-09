// Create this as /api/test-email.js to test email configuration
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log('=== EMAIL CONFIGURATION TEST ===');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length || 0);
    console.log('EMAIL_PASS preview:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) + '****' : 'MISSING');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        error: 'Missing email credentials',
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
      });
    }

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      },
    });

    // Test the connection first
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'car.check.store@gmail.com',
      subject: 'Test Email - Webhook Configuration',
      text: `Test email sent at ${new Date().toISOString()}`,
      html: `
        <h3>Email Configuration Test</h3>
        <p>✅ Email is working correctly!</p>
        <p><b>Sent at:</b> ${new Date().toISOString()}</p>
        <p><b>From:</b> ${process.env.EMAIL_USER}</p>
      `,
    });

    console.log('✅ Test email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
      from: process.env.EMAIL_USER,
      to: 'car.check.store@gmail.com'
    });

  } catch (error) {
    console.error('❌ Email test failed:', error);
    
    let errorDetails = {
      message: error.message,
      code: error.code,
      command: error.command
    };

    // Common error explanations
    let explanation = '';
    if (error.code === 'EAUTH') {
      explanation = 'Authentication failed. Check if you are using an App Password instead of your regular Gmail password.';
    } else if (error.code === 'ESOCKET') {
      explanation = 'Network connection failed. This might be a temporary issue.';
    } else if (error.message?.includes('Invalid login')) {
      explanation = 'Invalid credentials. Make sure EMAIL_USER is your full Gmail address and EMAIL_PASS is a valid App Password.';
    }

    return res.status(500).json({ 
      success: false,
      error: errorDetails,
      explanation,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUserLength: process.env.EMAIL_USER?.length || 0,
      emailPassLength: process.env.EMAIL_PASS?.length || 0
    });
  }
}