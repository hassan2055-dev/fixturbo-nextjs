import nodemailer from 'nodemailer';
import { Paddle, Environment, EventName } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.production, // or Environment.sandbox if testing
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const signature = req.headers['paddle-signature'] || '';
    const rawRequestBody = req.rawBody?.toString() || req.body?.toString?.() || '';
    const secretKey = process.env.PADDLE_SECRET_KEY || '';

    if (!signature || !rawRequestBody) {
      return res.status(400).json({ message: 'Signature or body missing' });
    }

    // Verify webhook
    const eventData = await paddle.webhooks.unmarshal(
      rawRequestBody,
      secretKey,
      signature
    );

    let subject = `Paddle Event: ${eventData.eventType}`;
    let plain = `Event: ${eventData.eventType}\nData: ${JSON.stringify(eventData.data, null, 2)}`;
    let html = `
      <h3>Paddle Webhook Event</h3>
      <p><b>Event Type:</b> ${eventData.eventType}</p>
      <pre>${JSON.stringify(eventData.data, null, 2)}</pre>
    `;

    // Customize email based on event type
    switch (eventData.eventType) {
      case EventName.SubscriptionActivated:
        subject = `Subscription ${eventData.data.id} Activated`;
        break;
      case EventName.SubscriptionCanceled:
        subject = `Subscription ${eventData.data.id} Canceled`;
        break;
      case EventName.TransactionPaid:
        subject = `Transaction ${eventData.data.id} Paid`;
        break;
      default:
        break;
    }

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'car.check.store@gmail.com',
      subject,
      text: plain,
      html,
    });

    return res.status(200).json({ ok: true, event: eventData });
  } catch (e) {
    console.error('Webhook error:', e);
    return res.status(500).json({ message: 'Webhook processing failed', error: e.message });
  }
}
