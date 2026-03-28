const path = require('path');
require('dotenv').config({ path: [path.join(__dirname, '.env'), path.join(__dirname, '..', '.env')] });

const STORES = ['store_001', 'store_002', 'store_003'];
const API_BASE = process.env.API_URL 
  ? process.env.API_URL.replace('/events', '') // Convert simulator endpoint to base API
  : 'https://amboras-assigment-6bwmkq5u8-satvik-pathaks-projects.vercel.app/api/v1';

async function testEndpoint(storeId, endpoint) {
  const url = `${API_BASE}/analytics/${endpoint}`;
  const start = Date.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-store-id': storeId,
        'Content-Type': 'application/json'
      }
    });

    const end = Date.now();
    const duration = end - start;
    const isFast = duration < 500;

    if (response.ok) {
      const result = await response.json();
      const statusIcon = isFast ? '⚡' : '🐢';
      console.log(`${statusIcon} [${duration}ms] ${endpoint.toUpperCase()}: ${response.status} OK`);
      
      // Use result directly (NestJS default) or result.data if present
      const data = result.data || result;
      
      if (endpoint === 'overview' && data.revenue) {
        console.log(`   💰 Revenue: $${data.revenue.month} | 🎯 Conv: ${data.conversionRate}%`);
      } else if (endpoint === 'top-products' && Array.isArray(data)) {
        console.log(`   📦 Products: ${data.length} found`);
      } else if (endpoint === 'live-visitors') {
        console.log(`   👥 Active: ${data.activeVisitors || 0}`);
      }
      return true;
    } else {
      console.error(`❌ [${duration}ms] ${endpoint.toUpperCase()} Failed: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Starting Analytics API Validation...');
  console.log(`🌍 Target: ${API_BASE}`);
  console.log('-----------------------------------');
  
  for (const storeId of STORES) {
    console.log(`\n🏢 Testing Store: ${storeId.toUpperCase()}`);
    await testEndpoint(storeId, 'overview');
    await testEndpoint(storeId, 'top-products');
    await testEndpoint(storeId, 'recent-activity');
    await testEndpoint(storeId, 'live-visitors');
  }
  
  console.log('\n✨ Validation tests complete!');
}

runTests();
