import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
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
    if (!list.length) {
      console.log('No transactions found');
      return res.status(404).json({ message: 'No transactions found' });
    }

    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Log all transactions to console
    console.log('=== PADDLE TRANSACTIONS ===');
    console.log(`Total transactions found: ${list.length}`);
    console.log('');
    
    list.forEach((tx, index) => {
      console.log(`Transaction ${index + 1}:`);
      console.log(`  ID: ${tx.id}`);
      console.log(`  Status: ${tx.status}`);
      console.log(`  Invoice: ${tx.invoice_number || tx.invoice_id || 'N/A'}`);
      console.log(`  Customer: ${tx.customer_id || 'N/A'}`);
      console.log(`  Currency: ${tx.currency_code || 'N/A'}`);
      console.log(`  Amount: ${tx.items?.[0]?.price?.unit_price?.amount || 'N/A'}`);
      console.log(`  Billed at: ${tx.billed_at || tx.created_at || 'N/A'}`);
      console.log('  ---');
    });

    const completed = list.find(t => t.status === 'completed');
    const latestTx = completed || list[0];
    
    console.log('Latest/Completed transaction:', latestTx);

    return res.status(200).json({ 
      ok: true, 
      total: list.length,
      latest: latestTx,
      transactions: list 
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      message: 'Failed to fetch transactions',
      error: error.response?.data || error.message,
    });
  }
}