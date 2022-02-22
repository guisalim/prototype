require("module-alias/register");
require("dotenv").config();

const express = require("express");
const { applyRoutes } = require("@controllers");
const { applyMiddleware } = require("@middlewares");
const { mongodb } = require("@databases");

const { SERVER_PORT, SERVER_URL } = process?.env;

const port = SERVER_PORT || 3001;
const app = express();
mongodb.connect();
applyMiddleware(app);
applyRoutes(app);

app.listen(port, () => {
  console.log(`Application listening at ${SERVER_URL || "localhost"}:${port}`);
});
