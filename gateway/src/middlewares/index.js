const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { CLIENT_URL, CLIENT_PORT } = process.env;

var corsOptions = {
  origin: function (origin, callback) {
    if ([`${CLIENT_URL}:${CLIENT_PORT}`].indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error("Not allowed by CORS"));
    }
  },
};

const setupLogging = (app) => {
  if (!app) {
    return;
  }

  app.use(cors(corsOptions));
  app.use(morgan("combined"));
  app.use(helmet());
};

const setupBodyParse = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

const setupProxies = (app, routes = []) => {
  if (!app) {
    return;
  }
  routes.forEach((r) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};

const setupRateLimit = (app, routes = []) => {
  routes.forEach((r) => {
    if (r.rateLimit) {
      app.use(r.url, rateLimit(r.rateLimit));
    }
  });
};

const applyMiddleware = (app, routes = []) => {
  if (!app) {
    return;
  }
  setupLogging(app);
  setupRateLimit(app, routes);
  setupProxies(app, routes);
  setupBodyParse(app);
};

module.exports = { applyMiddleware };
