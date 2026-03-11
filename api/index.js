// Vercel Serverless Function Entry Point
// Using the correct handler pattern for Vercel + Express
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// All routes prefixed since Vercel routes /api/* here
app.get('*', (req, res, next) => {
    // handle /api/test
    if (req.path === '/api/test' || req.path === '/test') {
        return res.json({
            status: 'OK',
            message: 'API layer is working',
            env: {
                hasSupabaseUrl: !!process.env.SUPABASE_URL,
                hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
                nodeVersion: process.version
            }
        });
    }
    next();
});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
});

// Export as Vercel handler (works with both express and direct handler)
module.exports = app;
