require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required in .env');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function setup() {
  console.log('🚀 Initializing Store Analytics Database...');
  
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    // Neon expects tagged template or query calls.
    // We'll split the schema into individual statements if necessary, 
    // but Neon's tagged template handles multifarious statements in some configurations.
    // For safety with serverless, we'll execute the raw string.
    await sql(schema);
    console.log('✅ Schema created successfully.');

    console.log('🌱 Seeding sample stores and events...');
    const storeIds = ['store_001', 'store_002', 'store_003'];
    const eventTypes = ['page_view', 'add_to_cart', 'purchase'];
    
    // Seed 1000 events
    for (const storeId of storeIds) {
      console.log(`- Seeding events for ${storeId}...`);
      const events = [];
      for (let i = 0; i < 500; i++) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const amount = eventType === 'purchase' ? parseFloat((Math.random() * 500).toFixed(2)) : null;
        const productId = eventType !== 'page_view' ? `prod_${Math.floor(Math.random() * 30).toString().padStart(3, '0')}` : null;
        
        events.push({
          event_id: `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}_${Math.random().toString(36).substr(2, 5)}`,
          store_id: storeId,
          event_type: eventType,
          data: {
            amount,
            currency: 'USD',
            product_id: productId,
            product_name: productId ? `Product ${productId.split('_')[1]}` : null,
            page: eventType === 'page_view' ? ['/home', '/products', '/about', '/cart'][Math.floor(Math.random() * 4)] : null,
            referrer: ['google.com', 'facebook.com', 'direct', 'twitter.com'][Math.floor(Math.random() * 4)]
          },
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
        });
      }

      // Batch insert (simplified for Neon serverless tagged templates)
      for (const event of events) {
        await sql`
          INSERT INTO events (event_id, store_id, event_type, timestamp, data)
          VALUES (${event.event_id}, ${event.store_id}, ${event.event_type}, ${event.timestamp}, ${event.data})
          ON CONFLICT (event_id) DO NOTHING
        `;
      }
    }
    
    console.log('✨ Database setup complete!');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setup();
