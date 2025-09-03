import nodemailer from 'nodemailer';
import { Paddle, Environment, EventName } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.production, // or Environment.sandbox if testing
});

// Disable body parsing to get raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to get raw body
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // Add CORS headers for webhook
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, paddle-signature');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Get raw body for signature verification
    const rawRequestBody = await getRawBody(req);
    const signature = req.headers['paddle-signature'] || '';
    const secretKey = process.env.PADDLE_SECRET_KEY || '';

    console.log('Webhook received:', {
      hasSignature: !!signature,
      hasBody: !!rawRequestBody,
      hasSecretKey: !!secretKey,
      bodyLength: rawRequestBody.length
    });

    if (!signature || !rawRequestBody) {
      console.error('Missing signature or body:', { signature: !!signature, body: !!rawRequestBody });
      return res.status(400).json({ message: 'Signature or body missing' });
    }

    if (!secretKey) {
      console.error('Missing PADDLE_SECRET_KEY environment variable');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Verify webhook signature
    let eventData;
    try {
      eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );
    } catch (verificationError) {
      console.error('Webhook verification failed:', verificationError);
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    console.log('Webhook verified successfully:', eventData.eventType);

    // Prepare email content
    let subject = `Paddle Event: ${eventData.eventType}`;
    let plain = `Event: ${eventData.eventType}\nData: ${JSON.stringify(eventData.data, null, 2)}`;
    let html = `
      <h3>Transaction Event</h3>
      <p><b>Event Type:</b> ${eventData.eventType}</p>
      <p><b>Event ID:</b> ${eventData.eventId || 'N/A'}</p>
      <p><b>Occurred At:</b> ${eventData.occurredAt || 'N/A'}</p>
      ${eventData.data.items && eventData.data.items.length > 0 ? `
      <p><b>Product:</b> ${eventData.data.items[0].price.name || "Unknown Product"}</p>
      <p><b>Amount:</b> $${((eventData.data.items[0].price.unitPrice.amount || 0) / 100).toFixed(2)} ${eventData.data.items[0].price.unitPrice.currencyCode || 'USD'}</p>
      <p><b>Customer ID:</b> ${eventData.data.customerId || 'N/A'}</p>
      <p><b>Transaction ID:</b> ${eventData.data.id || 'N/A'}</p>
      <p><b>Status:</b> ${eventData.data.status || 'N/A'}</p>
      ` : '<p><b>No items found in transaction</b></p>'}
      
    `;
    // <pre>${JSON.stringify(eventData.data, null, 2)}</pre>

    // Customize email based on event type
    switch (eventData.eventType) {
      case EventName.TransactionCreated:
        subject = `New Transaction Created: ${eventData.data.id}`;
        break;
      case EventName.TransactionPaid:
        subject = `Transaction Paid: ${eventData.data.id}`;
        break;
      case EventName.TransactionCompleted:
        subject = `Transaction Completed: ${eventData.data.id}`;
        break;
      case EventName.SubscriptionActivated:
        subject = `Subscription Activated: ${eventData.data.id}`;
        break;
      case EventName.SubscriptionCanceled:
        subject = `Subscription Canceled: ${eventData.data.id}`;
        break;
      default:
        console.log('Unhandled event type:', eventData.eventType);
        break;
    }

    // Send Email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { 
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS 
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'car.check.store@gmail.com',
        subject,
        text: plain,
        html,
      });

      console.log('Email sent successfully for event:', eventData.eventType);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the webhook if email fails
    }

    return res.status(200).json({ 
      ok: true, 
      event: eventData.eventType,
      id: eventData.eventId 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ 
      message: 'Webhook processing failed', 
      error: error.message 
    });
  }
}