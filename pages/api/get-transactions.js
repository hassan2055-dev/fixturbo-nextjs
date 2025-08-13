import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Function to fetch all transactions with pagination
    const fetchAllTransactions = async () => {
      let allTransactions = [];
      let hasNextPage = true;
      let after = null;

      while (hasNextPage) {
        const params = { 
          per_page: 200, // Increase per page limit
          order_by: 'created_at[desc]'
        };
        
        if (after) {
          params.after = after;
        }

        console.log(`Fetching transactions page... (after: ${after || 'start'})`);
        
        const { data } = await axios.get('https://api.paddle.com/transactions', {
          headers: {
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          params,
        });

        const transactions = Array.isArray(data?.data) ? data.data : [];
        allTransactions = allTransactions.concat(transactions);

        // Check if there's a next page
        hasNextPage = data?.meta?.has_more === true;
        after = data?.meta?.pagination?.cursors?.after || null;

        console.log(`Fetched ${transactions.length} transactions. Total so far: ${allTransactions.length}`);
        
        // Safety check to prevent infinite loops
        if (allTransactions.length > 10000) {
          console.log('Reached safety limit of 10,000 transactions');
          break;
        }
      }

      return allTransactions;
    };

    console.log('Starting to fetch ALL transactions...');
    const list = await fetchAllTransactions();
    
    if (!list.length) {
      console.log('No transactions found');
      return res.status(404).json({ message: 'No transactions found' });
    }

    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Log all transactions to console
    console.log('=== ALL PADDLE TRANSACTIONS ===');
    console.log(`Total transactions found: ${list.length}`);
    console.log('');
    
    // Group transactions by status for better overview
    const statusGroups = {};
    list.forEach((tx) => {
      const status = tx.status || 'unknown';
      if (!statusGroups[status]) statusGroups[status] = [];
      statusGroups[status].push(tx);
    });

    console.log('Transactions by status:');
    Object.keys(statusGroups).forEach(status => {
      console.log(`  ${status}: ${statusGroups[status].length} transactions`);
    });
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
      statusBreakdown: statusGroups,
      latest: latestTx,
      transactions: list,
      summary: {
        totalTransactions: list.length,
        completedTransactions: statusGroups.completed?.length || 0,
        pendingTransactions: statusGroups.pending?.length || 0,
        failedTransactions: statusGroups.failed?.length || 0,
        firstTransaction: list[list.length - 1],
        latestTransaction: list[0]
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      message: 'Failed to fetch transactions',
      error: error.response?.data || error.message,
    });
  }
}