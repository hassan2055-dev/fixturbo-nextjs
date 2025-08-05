import getRawBody from 'raw-body';
import qs from 'querystring';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Required to handle Paddle's raw form data
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
    const rawBody = await getRawBody(req);
    const parsedBody = qs.parse(rawBody.toString());

    const alertName = parsedBody['alert_name'];
    const customerEmail = parsedBody['email'];
    const amount = parsedBody['sale_gross'];
    const currency = parsedBody['currency'];

    if (alertName === 'payment_succeeded') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'car.check.store@gmail.com', // or customerEmail
        subject: '💰 Paddle Transaction Received!',
        text: `Payment of ${amount} ${currency} received from ${customerEmail}`,
      });

      console.log('✅ Email sent');
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}
