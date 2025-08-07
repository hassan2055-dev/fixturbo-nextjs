// pages/api/get-transactions.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.paddle.com/transactions', {
      headers: {
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch transactions',
      error: error.response?.data || error.message,
    });
  }
}
