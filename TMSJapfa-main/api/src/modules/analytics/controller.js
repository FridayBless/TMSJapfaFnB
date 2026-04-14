const supabase = require('../../config/supabase');

const getKPISummary = async (req, res) => {
    try {
        // In a real app, we would query the trip_kpi_metrics view
        // For prototype, we'll return structured mock data that matches Dashboard.html
        const { data, error } = await supabase
            .from('trip_kpi_metrics')
            .select('*');

        if (error) throw error;

        // Calculate aggregates from the view
        const totalShipments = data.length;
        const avgOTIF = data.reduce((acc, curr) => acc + curr.otif_rate, 0) / (totalShipments || 1);
        const avgFillRate = data.reduce((acc, curr) => acc + curr.fill_rate, 0) / (totalShipments || 1);

        // Get Load Factor summary
        const { data: loadData, error: loadError } = await supabase
            .from('truck_daily_load_factor')
            .select('avg_load_factor');

        const avgLoadFactor = loadData ? loadData.reduce((acc, curr) => acc + curr.avg_load_factor, 0) / (loadData.length || 1) : 0;

        res.status(200).json({
            status: 'success',
            data: {
                otifRate: (avgOTIF * 100).toFixed(1) + '%',
                fillRate: (avgFillRate * 100).toFixed(1) + '%',
                loadFactor: (avgLoadFactor * 100).toFixed(1) + '%',
                totalShipments: totalShipments,
                avgLoadingTime: '35 mins'
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getFleetUtilization = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('trucks')
            .select('status');

        if (error) throw error;

        const total = data.length;
        const active = data.filter(t => t.status === 'in_transit' || t.status === 'loading').length;
        const utilization = total > 0 ? (active / total) * 100 : 0;

        res.status(200).json({
            status: 'success',
            data: {
                totalTrucks: total,
                activeTrucks: active,
                utilizationRate: utilization.toFixed(0) + '%'
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getDeliveryVolume = async (req, res) => {
    // Return mock hourly data for the chart
    res.status(200).json({
        status: 'success',
        data: [
            { hour: '08:00', orders: 96 },
            { hour: '10:00', orders: 156 },
            { hour: '12:00', orders: 120 },
            { hour: '14:00', orders: 84 },
            { hour: '16:00', orders: 108 },
            { hour: '18:00', orders: 240 },
            { hour: '20:00', orders: 72 }
        ]
    });
};

const getDriverPerformance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('driver_performance_kpi')
            .select('*');

        if (error) throw error;

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getRejectionStats = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rejection_stats')
            .select('*');

        if (error) throw error;

        res.status(200).json({
            status: 'success',
            data: data.length > 0 ? data : [
                { return_reason: 'Damaged Goods', percentage: 60 },
                { return_reason: 'Wrong Item', percentage: 25 },
                { return_reason: 'Customer Not Home', percentage: 15 }
            ]
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getKPISummary,
    getFleetUtilization,
    getDeliveryVolume,
    getDriverPerformance,
    getRejectionStats
};
