# Store Analytics Dashboard

A real-time, high-performance analytics dashboard built for eCommerce store owners. Designed to handle high-volume event streams (1,000,000+ events) with sub-10ms query performance through advanced SQL optimization and backend caching.

## 📺 Project Live
- **Live Dashboard**: [https://eCom-assigment-uhuu.vercel.app/](https://eCom-assigment-uhuu.vercel.app/)
- **Demo Video**: [Watch the Dashboard Demonstration](https://youtu.be/gU-kXujM1oE)

## 🚀 Setup Instructions

### 1. Database Setup
The dashboard uses **Neon.tech (Postgres)** for serverless performance.
```bash
cd backend
npm install
# Copy .env.example to .env and fill in DATABASE_URL
node database/setup.js
```

### 2. Run Backend
```bash
cd backend
npm run start:dev
```
The API runs at `http://localhost:3001`.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` (Login: `eCom@demo.com` / `demo`).

---

## 🏗️ Architecture Decisions

### Data Aggregation Strategy
- **Decision**: Single-Query Common Table Expression (CTE) for whole-store snapshots.
- **Why**: Instead of running 10 separate queries for different metrics, one CTE allows the database engine to optimize the scan path once, significantly reducing I/O and CPU overhead.
- **Trade-offs**: Slightly more complex SQL maintenance, but gains massive performance and atomic consistency (all metrics reflect the exact same point-in-time state).

### Real-time vs. Batch Processing
- **Decision**: Hybrid Real-Time (Pusher) + SWR Background Refresh.
- **Why**: Pre-computing everything ("Batch") can lead to stale data in high-freq stores. Pure real-time ("Pusher-only") is too noisy for high-volume aggregations. We use Pusher to trigger UI updates and SWR (Stale-While-Revalidate) to refresh the heavy metrics in the background.
- **Trade-offs**: Sacrificed absolute millisecond-consistency for perceived speed and reduced server load. Gained a "snappy" feeling UI that never blocks on a loader.

### Frontend Data Fetching
- **Decision**: Next.js 14 + SWR (Stale-While-Revalidate).
- **Why**: SWR handles caching, revalidation, and optimistic UI out of the box. This ensures the dashboard feels instantaneous while data is updated in the background.
- **Trade-offs**: More memory consumption on the client-side compared to simple fetch, but the UX improvement is night and day.

### Performance Optimizations
- **Database Indexing**: Compound indexes on `(store_id, event_type, created_at)` to ensure aggregations are always index-scanned.
- **Neon Serverless Optimization**: Used the Neon serverless driver to prevent connection bloat during spikes.
- **TTL Caching**: Implemented a 10s TTL cache on analytics endpoints to prevent "DDoS-by-Refresh" and serve sub-10ms response times.

## 🛑 Known Limitations
- **Scaling to 100M+ events**: While optimized, a single PostgreSQL instance will eventually need partitioning (Time-scaleDB) for event storage.
- **Cold Starts**: Vercel Serverless cold starts can add ~500ms to the first request of the day.

## 🌟 What I'd Improve With More Time
- **Clickstream Heatmaps**: Visualize exactly where customers are dropping off on the page via coordinate tracking.

- **Automated Alerts**: Add a Discord/Slack webhook for when conversion rates drop below a threshold.

## ⏱️ Time Spent
- **Coding & Finalization**: 3.5 Hours
- **Deployment & Scaling**: 20 Minutes
