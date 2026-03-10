const express = require('express');
const router = express.Router();
const analyticsController = require('./controller');

/**
 * @route GET /api/analytics/kpi-summary
 * @desc Get high-level KPI cards data (OTIF, Returns, Total Shipments, Avg Loading)
 */
router.get('/kpi-summary', analyticsController.getKPISummary);

/**
 * @route GET /api/analytics/fleet-utilization
 * @desc Get truck status summary and utilization percentage
 */
router.get('/fleet-utilization', analyticsController.getFleetUtilization);

/**
 * @route GET /api/analytics/delivery-volume
 * @desc Get hourly/daily delivery chart data
 */
router.get('/delivery-volume', analyticsController.getDeliveryVolume);

/**
 * @route GET /api/analytics/driver-performance
 * @desc Get efficiency metrics for all drivers
 */
router.get('/driver-performance', analyticsController.getDriverPerformance);

/**
 * @route GET /api/analytics/rejections
 * @desc Get rejection reasons and statistics
 */
router.get('/rejections', analyticsController.getRejectionStats);

module.exports = router;
