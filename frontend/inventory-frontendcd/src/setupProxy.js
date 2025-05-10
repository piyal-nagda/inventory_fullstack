const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5212', // Use HTTP port from launchSettings
      changeOrigin: true,
      secure: false,
      ws: true, // Enable websockets
      logLevel: 'debug'
    })
  );
};