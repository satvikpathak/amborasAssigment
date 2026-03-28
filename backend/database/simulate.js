const path = require('path');
require('dotenv').config({ path: [path.join(__dirname, '.env'), path.join(__dirname, '..', '.env')] });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in .env');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

// Simple fetch-like implementation for node (or use axios/node-fetch if available)
// But since we want to show "LIVE" in the dashboard, 
// we can either POST to the API or just insert into DB 
// (INSERTING INTO DB works if the backend is running and listening for new events)

async function sendEvent() {
  const storeId = ['store_001', 'store_002', 'store_003'][Math.floor(Math.random() * 3)];
  const eventTypes = ['page_view', 'add_to_cart', 'purchase'];
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const amount = eventType === 'purchase' ? parseFloat((Math.random() * 500).toFixed(2)) : null;
  const productId = eventType !== 'page_view' ? `prod_${Math.floor(Math.random() * 30).toString().padStart(3, '0')}` : null;

  const event = {
    event_id: `sim_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    store_id: storeId,
    event_type: eventType,
    timestamp: new Date().toISOString(),
    data: {
      amount,
      currency: 'USD',
      product_id: productId,
      product_name: productId ? `Product ${productId.split('_')[1]}` : null,
      page: eventType === 'page_view' ? ['/home', '/products', '/about', '/cart'][Math.floor(Math.random() * 4)] : null,
      referrer: ['google.com', 'facebook.com', 'direct', 'twitter.com'][Math.floor(Math.random() * 4)]
    }
  };

  try {
    // Note: Inserting directly into DB will NOT trigger Pusher 
    // unless the backend has a DB trigger (which it doesn't).
    // So for REAL-TIME simulation, we MUST use a POST request to the API.
    
    // We'll use a simple node fetch-like approach or tell the user 
    // to run the curl command in a loop.
    
    console.log(`🚀 [SIM] Sending ${eventType} for ${storeId}...`);
    
    // Using global fetch if available (Node 18+)
    const apiUrl = process.env.API_URL || 'https://amboras-assigment-6bwmkq5u8-satvik-pathaks-projects.vercel.app/api/v1/events';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      console.log(`✅ Event sent!`);
    } else {
      console.error(`❌ Failed to send: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

console.log('📈 Starting Live Traffic Simulator...');
console.log('Press Ctrl+C to stop.');

// Send an event every 3 seconds
setInterval(sendEvent, 3000);
sendEvent();
