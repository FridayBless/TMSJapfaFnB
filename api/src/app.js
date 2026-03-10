const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// Routes
const authRoutes = require('./modules/auth/routes');
const monitoringRoutes = require('./modules/monitoring/routes');
const orderRoutes = require('./modules/orders/routes');
const truckRoutes = require('./modules/trucks/routes');
const analyticsRoutes = require('./modules/analytics/routes');
const routingRoutes = require('./modules/routing/routes');

app.use('/api/auth', authRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/routing', routingRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'TMS Japfa Backend is healthy' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'Error',
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
