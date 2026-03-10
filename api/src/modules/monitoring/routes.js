const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

// Mock monitoring data for prototype
router.get('/trucks', (req, res) => {
    res.json([
        { id: 1, plate: 'B 1234 ABC', type: 'CDD', location: { lat: -6.2, lng: 106.8 }, status: 'Active' },
        { id: 2, plate: 'B 5678 XYZ', type: 'Wingbox', location: { lat: -6.3, lng: 106.9 }, status: 'Delivering' }
    ]);
});

router.post('/location-update', (req, res) => {
    const { truckId, lat, lng } = req.body;
    console.log(`📍 Tracking update for Truck ${truckId}: ${lat}, ${lng}`);
    res.status(200).json({ message: 'Location updated successfully' });
});

/**
 * @route GET /api/monitoring/alerts
 * @desc Get real-time alerts from Supabase
 */
router.get('/alerts', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
