import getRawBody from 'raw-body';
import qs from 'querystring';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const raw = await getRawBody(req);
  const body = qs.parse(raw.toString('utf8'));

  if (
    body.alert_name === 'payment_succeeded' ||
    body.alert_name === 'checkout_completed'
  ) {
    const msg = {
      to: 'rmoto7817@gmail.com',
      from: 'rmoto7817@gmail.com', // must be your verified sender
      subject: 'New Paddle Payment Received',
      text: `A user has paid!\n\nDetails:\nEmail: ${body.email}\nName: ${body.customer_name}\nAmount: ${body.sale_gross}\nPlan: ${body.product_name}`,
    };

    try {
      await sgMail.send(msg);
    } catch (e) {
      console.error('Email send error:', e);
    }
  }

  res.status(200).end();
}