require("module-alias/register");
require("dotenv").config();

const express = require("express");
const { routes } = require("@routes");
const { applyMiddleware } = require("@middlewares");

const { REACT_APP_GATEWAY_PORT, REACT_APP_GATEWAY_URL } = process.env;
const port = REACT_APP_GATEWAY_PORT || 3000;
const app = express();
applyMiddleware(app, routes);

app.listen(port, () => {
  console.log(`Application listening at ${REACT_APP_GATEWAY_URL || "localhost"}:${port}`);
});
