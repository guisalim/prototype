const gamesModel = require("@models/games");

module.exports = {
  list: (params) => gamesModel.list(params),
  get: ({ _id }) => gamesModel.get({ _id }),
  create: ({ game }) => gamesModel.create({ game }),
  edit: ({ game }) => gamesModel.edit({ game }),
  mock: () => gamesModel.mock(),
};
