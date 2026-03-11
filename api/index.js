// Pure Node.js handler - ZERO npm dependencies
// This tests if Vercel can even run a function without any node_modules
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    res.end(JSON.stringify({
        status: 'OK',
        message: 'API layer is working',
        path: req.url,
        timestamp: new Date().toISOString(),
        env: {
            hasSupabaseUrl: !!process.env.SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
            nodeVersion: process.version
        }
    }));
};
