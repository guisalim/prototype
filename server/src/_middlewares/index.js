const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const setupLogging = (app) => {
  if (!app) {
    return;
  }
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(helmet());
};

const setupBodyParse = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

const applyMiddleware = (app, routes = []) => {
  if (!app) {
    return;
  }
  setupLogging(app);
  setupBodyParse(app);
};

module.exports = { applyMiddleware };
