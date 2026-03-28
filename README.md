# Store Analytics Dashboard — Amboras Take-Home

A real-time, high-performance analytics dashboard built for eCommerce store owners. Designed to handle high-volume event streams (1,000,000+ events) with sub-10ms query performance through advanced SQL optimization and backend caching.

## 📁 Repository Structure
- `backend/`: NestJS API for event ingestion, real-time Pusher integration, and high-performance SQL analytics.
- `frontend/`: Next.js 14 dashboard with professional-grade visualizations, mobile-responsive layout, and client-side route protection.

## 🚀 Quick Start

### 1. Database Setup
The dashboard uses **Neon.tech (PostgreSQL)** for serverless performance.
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
Open `http://localhost:3000` (Login: `amboras@demo.com` / `demo`).

## � One-Click Vercel Deployment

This project is pre-configured for a seamless monorepo deployment on Vercel.

### 1. Deploy Backend (NestJS Serverless)
1. Import the repository to Vercel as a **new project**.
2. Set **Root Directory** to `backend`.
3. The included `backend/vercel.json` and `backend/api/index.ts` will automatically bridge NestJS to Vercel Serverless.
4. Add **Environment Variables**:
   - `DATABASE_URL`: Your Neon/Postgres connection string.
   - `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`: Your Pusher credentials.
5. **Deploy**. Note your backend URL (e.g., `https://amboras-api.vercel.app`).

### 2. Deploy Frontend (Next.js)
1. Import the repository to Vercel as a **second new project**.
2. Set **Root Directory** to `frontend`.
3. Add **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `[YOUR_BACKEND_URL]/api/v1`
   - `NEXT_PUBLIC_PUSHER_KEY`: Your Pusher Key.
   - `NEXT_PUBLIC_PUSHER_CLUSTER`: Your Pusher Cluster.
4. **Deploy**.

## �🛠️ Key Features
- **Real-time Performance**: Measured live latency displayed on the dashboard dashboard.
- **Multi-tenant Isolation**: Strict store-level data siloing via `x-store-id` headers.
- **Optimized Queries**: Consolidated CTEs and SWR background refresh for sub-10ms response times.
- **Responsive Design**: Premium "Command Center" layout optimized for both desktop and mobile views.

## 🔑 Environment Variables
See `.env.example` in the root or individual directories for:
- `DATABASE_URL`: PostgreSQL connection string.
- `PUSHER_APP_ID`, `PUSHER_KEY`, etc.: Pusher credentials for live updates.
- `NEXT_PUBLIC_API_URL`: Backend endpoint (default: `http://localhost:3001/api/v1`).
