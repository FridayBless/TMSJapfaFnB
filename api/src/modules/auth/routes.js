const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

// Mock login for prototype
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // In a real app, use supabase.auth.signInWithPassword
    if (email === 'admin@japfa.com' && password === 'admin123') {
        res.json({
            status: 'success',
            token: 'mock-jwt-token',
            user: { id: '1', email: 'admin@japfa.com', role: 'admin' }
        });
    } else {
        res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
});

module.exports = router;
