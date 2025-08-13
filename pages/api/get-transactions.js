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
          per_page: 50, // Start with smaller pages to avoid timeout
          order_by: 'created_at[desc]'
        };
        
        if (after) {
          // Try different cursor parameter names
          if (after.includes('T')) {
            // Looks like a timestamp
            params.created_at = `[LT]${after}`;
          } else {
            // Try as regular after cursor
            params.after = after;
          }
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
        console.log('Full response structure:');
        console.log('Response data keys:', Object.keys(response.data || {}));
        console.log('Response meta:', JSON.stringify(response.data?.meta, null, 2));

        // Check if response has the expected structure
        if (!response.data) {
          console.log('No response data');
          break;
        }

        // Handle different response structures
        let transactions = [];
        
        if (Array.isArray(response.data.data)) {
          transactions = response.data.data;
        } else if (Array.isArray(response.data.transactions)) {
          transactions = response.data.transactions;
        } else if (response.data.statusBreakdown) {
          // Handle the structure from your example response
          transactions = [];
          const statusBreakdown = response.data.statusBreakdown;
          Object.keys(statusBreakdown).forEach(status => {
            if (Array.isArray(statusBreakdown[status])) {
              transactions = transactions.concat(statusBreakdown[status]);
            }
          });
        } else {
          console.log('Unexpected response structure:', response.data);
          break;
        }

        allTransactions = allTransactions.concat(transactions);

        // Check pagination - try multiple ways based on Paddle's API
        const meta = response.data?.meta;
        let nextCursor = null;
        
        // Method 1: Standard meta pagination
        if (meta?.pagination?.has_more) {
          nextCursor = meta.pagination.next_cursor || meta.pagination.cursors?.after;
        }
        
        // Method 2: Direct has_more flag
        if (meta?.has_more) {
          nextCursor = meta.next_cursor || meta.after;
        }
        
        // Method 3: Look for any cursor-like fields in meta
        if (!nextCursor && meta) {
          const possibleCursors = ['next', 'next_cursor', 'after', 'continuation_token'];
          for (const field of possibleCursors) {
            if (meta[field] && typeof meta[field] === 'string') {
              nextCursor = meta[field];
              break;
            }
          }
        }
        
        // Method 4: Check if we got a full page - use timestamp-based pagination
        if (!nextCursor && transactions.length === params.per_page) {
          // Use the last transaction's created_at as cursor for next page
          const lastTransaction = transactions[transactions.length - 1];
          if (lastTransaction?.created_at) {
            // Convert to ISO string and use as after parameter
            nextCursor = lastTransaction.created_at;
            console.log(`Using timestamp cursor: ${nextCursor}`);
          }
        }
        
        // Method 5: If still no cursor but we got results, try using the last transaction ID
        if (!nextCursor && transactions.length > 0 && transactions.length === params.per_page) {
          const lastTransaction = transactions[transactions.length - 1];
          if (lastTransaction?.id) {
            nextCursor = lastTransaction.id;
            console.log(`Using ID cursor: ${nextCursor}`);
          }
        }

        after = nextCursor;
        hasNextPage = !!nextCursor && transactions.length > 0;

        console.log(`Page ${pageCount}: Fetched ${transactions.length} transactions. Total so far: ${allTransactions.length}`);
        console.log(`Has more pages: ${hasNextPage}, Next cursor: ${after || 'none'}`);
        
        // Additional stop conditions
        if (transactions.length === 0) {
          console.log('No transactions returned, stopping pagination');
          hasNextPage = false;
        }
        
        // If we got fewer transactions than requested, we might be at the end
        if (transactions.length < params.per_page && !nextCursor) {
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

        // Add a small delay to avoid rate limiting
        if (hasNextPage) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return allTransactions;
    };

    console.log('Starting to fetch ALL transactions...');
    
    const list = await fetchAllTransactions();
    
    // Remove duplicates if any
    const uniqueTransactions = [];
    const seenIds = new Set();
    
    for (const tx of list) {
      if (!seenIds.has(tx.id)) {
        seenIds.add(tx.id);
        uniqueTransactions.push(tx);
      }
    }
    
    console.log(`Total transactions after deduplication: ${uniqueTransactions.length} (removed ${list.length - uniqueTransactions.length} duplicates)`);
    
    // Use the unique list
    const finalList = uniqueTransactions;
    
    if (!finalList.length) {
      console.log('No transactions found');
      return res.status(404).json({ message: 'No transactions found' });
    }

    finalList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Log all transactions to console
    console.log('=== ALL PADDLE TRANSACTIONS ===');
    console.log(`Total transactions found: ${finalList.length}`);
    console.log('');
    
    // Group transactions by status for better overview
    const statusGroups = {};
    finalList.forEach((tx) => {
      const status = tx.status || 'unknown';
      if (!statusGroups[status]) statusGroups[status] = [];
      statusGroups[status].push(tx);
    });

    console.log('Transactions by status:');
    Object.keys(statusGroups).forEach(status => {
      console.log(`  ${status}: ${statusGroups[status].length} transactions`);
    });
    console.log('');
    
    finalList.forEach((tx, index) => {
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

    const completed = finalList.find(t => t.status === 'completed');
    const latestTx = completed || finalList[0];
    
    console.log('Latest/Completed transaction:', latestTx);

    return res.status(200).json({ 
      ok: true, 
      total: finalList.length,
      statusBreakdown: statusGroups,
      latest: latestTx,
      transactions: finalList,
      summary: {
        totalTransactions: finalList.length,
        completedTransactions: statusGroups.completed?.length || 0,
        pendingTransactions: statusGroups.pending?.length || 0,
        failedTransactions: statusGroups.failed?.length || 0,
        firstTransaction: finalList[finalList.length - 1],
        latestTransaction: finalList[0]
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