// Standalone Express API for Vercel
// This does NOT load ./src/app to avoid module-not-found crashes during diagnosis
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'TMS Japfa API is alive', timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API layer is working',
        env: {
            hasSupabaseUrl: !!process.env.SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
            nodeVersion: process.version
        }
    });
});

// Catch all
app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
});

module.exports = app;
