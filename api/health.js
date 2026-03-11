// Minimal health check - zero external dependencies
module.exports = (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'TMS Japfa API is running',
        timestamp: new Date().toISOString(),
        env: {
            hasSupabaseUrl: !!process.env.SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
            nodeVersion: process.version
        }
    });
};
