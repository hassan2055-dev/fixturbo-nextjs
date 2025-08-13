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
      let pageCount = 0;

      while (hasNextPage) {
        pageCount++;
        const params = { 
          per_page: 200, // Maximum per page limit for Paddle
          order_by: 'created_at[desc]'
        };
        
        if (after) {
          params.after = after;
        }

        console.log(`Fetching page ${pageCount}... (after: ${after || 'start'})`);
        console.log('Request params:', params);
        
        const response = await axios.get('https://api.paddle.com/transactions', {
          headers: {
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          params,
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response meta:', response.data?.meta);

        const transactions = Array.isArray(response.data?.data) ? response.data.data : [];
        allTransactions = allTransactions.concat(transactions);

        // Check if there's a next page using multiple methods
        const meta = response.data?.meta;
        hasNextPage = meta?.has_more === true || meta?.pagination?.has_more === true;
        after = meta?.pagination?.cursors?.after || meta?.next_cursor || null;

        console.log(`Page ${pageCount}: Fetched ${transactions.length} transactions. Total so far: ${allTransactions.length}`);
        console.log(`Has more pages: ${hasNextPage}, Next cursor: ${after || 'none'}`);
        
        // If we got fewer transactions than requested and no next cursor, we're done
        if (transactions.length < params.per_page && !after) {
          console.log('Reached end of results (partial page and no cursor)');
          hasNextPage = false;
        }
        
        // Safety check to prevent infinite loops
        if (allTransactions.length > 50000) {
          console.log('Reached safety limit of 50,000 transactions');
          break;
        }

        // Safety check for too many pages
        if (pageCount > 250) {
          console.log('Reached safety limit of 250 pages');
          break;
        }
      }

      return allTransactions;
    };

    console.log('Starting to fetch ALL transactions...');
    
    // First, let's try to get a count or overview
    try {
      const testResponse = await axios.get('https://api.paddle.com/transactions', {
        headers: {
          Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        params: {
          per_page: 1, // Just get 1 to see meta info
          order_by: 'created_at[desc]'
        }
      });
      
      console.log('Test response meta information:');
      console.log(JSON.stringify(testResponse.data?.meta, null, 2));
      
    } catch (testError) {
      console.log('Test request failed:', testError.message);
    }
    
    const list = await fetchAllTransactions();
    
    // If we got exactly 30 transactions, try alternative pagination methods
    if (list.length === 30) {
      console.log('Got exactly 30 transactions, trying alternative pagination...');
      
      try {
        // Try with different parameters
        const altResponse = await axios.get('https://api.paddle.com/transactions', {
          headers: {
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          params: {
            per_page: 50,
            page: 2, // Try page-based pagination
            order_by: 'created_at[desc]'
          }
        });
        
        console.log('Alternative pagination response:');
        console.log('Status:', altResponse.status);
        console.log('Data length:', altResponse.data?.data?.length || 0);
        console.log('Meta:', altResponse.data?.meta);
        
        if (altResponse.data?.data?.length > 0) {
          console.log('Found more transactions with alternative method!');
          // Add these to our list if they're not duplicates
          const newTransactions = altResponse.data.data.filter(
            tx => !list.find(existing => existing.id === tx.id)
          );
          list.push(...newTransactions);
          console.log(`Added ${newTransactions.length} more transactions`);
        }
        
      } catch (altError) {
        console.log('Alternative pagination failed:', altError.message);
      }
    }
    
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