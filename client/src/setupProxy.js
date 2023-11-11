const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/*"],
    createProxyMiddleware({
      target: process.env.NODE_ENV === 'production' ? "production-url" : "http://localhost:3140",
    })
  );
};