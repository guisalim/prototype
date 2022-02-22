const express = require("express");
const gamesService = require("@services/games");

const router = express.Router();

router.get("/", async (req, res) => {
  const premium = isNaN(parseInt(req.query.premium)) || !parseInt(req.query.premium) ? 0 : 1;
  const listings = await gamesService.list({
    premium,
  });
  res.send({ listings });
});

router.get("/:id", async (req, res) => {
  const game = await gamesService.get({ _id: req.params.id });
  res.send({ game });
});

router.post("/", async (req, res) => {
  const game = await gamesService.create({ game: req.body.game });
  res.send({ game });
});

router.put("/:id", async (req, res) => {
  const game = await gamesService.edit({ game: req.body.game });
  res.send({ game });
});

module.exports = router;
