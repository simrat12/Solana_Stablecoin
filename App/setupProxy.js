import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  // Proxy requests starting with '/app1' to App1
  app.use(
    '../../App/mainpage/',
    createProxyMiddleware({
      target: 'http://localhost:5173', // Replace with the actual URL of App1
      changeOrigin: true,
    })
  );

  // Proxy requests starting with '/app2' to App2
  app.use(
    '../../App/dashboard/',
    createProxyMiddleware({
      target: 'http://localhost:5174', // Replace with the actual URL of App2
      changeOrigin: true,
    })
  );
};
