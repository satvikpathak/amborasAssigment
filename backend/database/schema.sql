-- Store Analytics Database Schema

CREATE TABLE IF NOT EXISTS events (
    event_id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    data JSONB NOT NULL
);

-- Compound index for fast time-series filtering by store
CREATE INDEX IF NOT EXISTS idx_events_store_timestamp ON events(store_id, timestamp DESC);

-- GIN index for deep querying into JSONB event data
CREATE INDEX IF NOT EXISTS idx_events_data ON events USING GIN (data);

-- Index for store-based aggregation
CREATE INDEX IF NOT EXISTS idx_events_store_type ON events(store_id, event_type);
