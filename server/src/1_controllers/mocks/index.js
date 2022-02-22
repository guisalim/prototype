const express = require("express");
const gamesService = require("@services/games");

const router = express.Router();

router.post("/", (req, res) => {
  res.send(gamesService.mock());
});
module.exports = router;
