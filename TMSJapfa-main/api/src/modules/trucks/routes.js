const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

// Get all trucks
router.get('/', async (req, res) => {
    // In prototype, we can return mock or try to fetch from supabase if configured
    res.json([
        { id: '1', plate: 'B 1234 ABC', type: 'CDD', driver: 'Anto', status: 'available' },
        { id: '2', plate: 'B 5678 XYZ', type: 'Wingbox', driver: 'Budi', status: 'busy' }
    ]);
});

// Update truck status
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(`🚛 Updating Truck ${id} status to: ${status}`);
    res.json({ status: 'success', message: 'Truck status updated' });
});

module.exports = router;
