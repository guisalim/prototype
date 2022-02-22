const defaultRateLimitMessage = (ms = 0) =>
  `Too many accounts created from this IP, please try again after: ${ms / 60000} minute(s).`;

const routes = [
  {
    url: "/",
    rateLimit: {
      windowMs: 60000 * 1,
      max: 10,
      message: defaultRateLimitMessage(60000 * 1),
    },
    proxy: {
      target: `${process?.env?.SERVER_URL || "http://localhost"}${
        process?.env?.SERVER_PORT ? `:${process?.env?.SERVER_PORT}` : ""
      }`,
      changeOrigin: true,
    },
  },
];

module.exports = {
  routes,
};
