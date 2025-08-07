import { Readable } from 'stream';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default bodyParser to handle raw body for signature verification
  },
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const payload = req.body;
    console.log('📨 Incoming webhook:', payload);
    const eventType = payload.event_type;
    const total = payload.data?.details?.totals?.total;
    const currency = payload.data?.currency_code;
    const checkoutURL = payload.data?.checkout?.url;

    if (eventType === 'transaction.created' || eventType === 'transaction.completed') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'car.check.store@gmail.com',
        subject: '💰 Paddle Transaction Created!',
        text: `New transaction for ${total} ${currency}. Checkout at: ${checkoutURL}`,
      });

      console.log('✅ Email sent');
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}

