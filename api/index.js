const app = require('./src/app');

module.exports = (req, res) => {
    // This allows Express to handle the request in a Vercel serverless environment
    return app(req, res);
};
