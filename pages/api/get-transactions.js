import axios from 'axios';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data } = await axios.get('https://api.paddle.com/transactions', {
      headers: {
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: { per_page: 20, order_by: 'created_at[desc]' },
    });

    const list = Array.isArray(data?.data) ? data.data : [];
    if (!list.length) return res.status(404).json({ message: 'No transactions found' });

    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const completed = list.find(t => t.status === 'completed');
    const tx = completed || list[0];

    const subject = `Paddle transaction: ${tx.invoice_number || tx.id} (${tx.status})`;
    const plain = [
      `Transaction ID: ${tx.id}`,
      `Status: ${tx.status}`,
      `Invoice: ${tx.invoice_number || tx.invoice_id || 'N/A'}`,
      `Customer: ${tx.customer_id || 'N/A'}`,
      `Currency: ${tx.currency_code || 'N/A'}`,
      `Billed at: ${tx.billed_at || tx.created_at || 'N/A'}`,
    ].join('\n');

    const html = `
      <h3>Paddle transaction</h3>
      <ul>
        <li><b>ID:</b> ${tx.id}</li>
        <li><b>Status:</b> ${tx.status}</li>
        <li><b>Invoice:</b> ${tx.invoice_number || tx.invoice_id || 'N/A'}</li>
        <li><b>Customer:</b> ${tx.customer_id || 'N/A'}</li>
        <li><b>Currency:</b> ${tx.currency_code || 'N/A'}</li>
        <li><b>Billed at:</b> ${tx.billed_at || tx.created_at || 'N/A'}</li>
        <li><b>Amount: ${tx.items[0].price.unit_price.amount ||'N/A'}
      </ul>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL || 'car.check.store@gmail.com',
      subject,
      text: plain,
      html,
    });

    return res.status(200).json({ ok: true, sent: true, latest: tx });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: 'Failed to send latest transaction email',
      error: error.response?.data || error.message,
    });
  }
}