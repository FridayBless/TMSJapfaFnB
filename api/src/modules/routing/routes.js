const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**
 * @route   POST /api/routing/optimize
 * @desc    Run VRP optimization to generate routes for a specific date
 * @access  Private (Admin)
 */
router.post('/optimize', controller.optimizeRoutes);
router.get('/trips', controller.getTrips);

module.exports = router;
