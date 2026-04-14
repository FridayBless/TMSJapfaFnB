const express = require('express');
const router = express.Router();

// Get list of sales orders
router.get('/', (req, res) => {
    res.json([
        { id: 'SO-001', customer: 'Customer A', status: 'Pending', total: 1500000 },
        { id: 'SO-002', customer: 'Customer B', status: 'Shipped', total: 2300000 }
    ]);
});

// Create new sales order
router.post('/', (req, res) => {
    const orderData = req.body;
    console.log('📦 New Order Received:', orderData);
    res.status(201).json({ status: 'success', message: 'Order created', orderId: 'SO-' + Date.now() });
});

module.exports = router;
