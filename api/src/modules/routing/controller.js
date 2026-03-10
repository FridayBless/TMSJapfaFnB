const VRPService = require('./service');

/**
 * Routing Controller
 */
const optimizeRoutes = async (req, res) => {
    try {
        const { date, region } = req.body;

        if (!date) {
            return res.status(400).json({
                status: 'error',
                message: 'Delivery date is required (YYYY-MM-DD).'
            });
        }

        const result = await VRPService.optimizeDailyRoutes(date, region || 'ALL');

        return res.json({
            status: 'success',
            message: 'Optimization completed successfully.',
            data: result
        });
    } catch (error) {
        console.error('Optimization Controller Error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to run route optimization.',
            error: error.message
        });
    }
};

const getTrips = async (req, res) => {
    try {
        const { date } = req.query;
        const result = await VRPService.getTripsByDate(date || new Date().toISOString().split('T')[0]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    optimizeRoutes,
    getTrips
};
