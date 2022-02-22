const { game } = require("@schemas");
const UITestJson = require("@mocks/UITest.json");

const default_object_fields = "-createdAt -updatedAt -__v";

const mock = async () => {
  let data = {};
  try {
    const mocks = UITestJson?.listings?.map((document) => ({
      insertOne: {
        document,
      },
    }));
    await game.schema.deleteMany({});
    data = await game.schema.bulkWrite(mocks);
  } catch (err) {
    console.error(`Error:: ${err}`);
  }
  return data;
};

const list = async (parameters = {}) => {
  let response;
  try {
    const { premium } = parameters;
    response = await game.schema
      .find({ isPremiumContent: Boolean(premium) }, default_object_fields)
      .sort({ updatedAt: 1 });
  } catch (e) {
    console.error(`Error:: ${err}`);
    response = UITestJson?.listings;
  }
  return response;
};

const get = async ({ _id }) => {
  let data = null;
  try {
    data = await game.schema.findById(_id, default_object_fields);
  } catch (e) {
    console.error(`Error:: ${err}`);
  }
  return data;
};

const create = async (parameters) => {
  let data = {};
  try {
    data = await game.schema.create(parameters?.game);
  } catch (err) {
    console.error(`Error:: ${err}`);
  }
  return data;
};

const edit = async (parameters) => {
  let data = {};
  try {
    data = await game.schema.findOneAndUpdate(
      { _id: parameters?.game?._id },
      parameters?.game, // { $set: { ...parameters?.game } },
      { new: true },
    );
  } catch (err) {
    console.error(`Error:: ${err}`);
  }
  return data;
};

module.exports = {
  list,
  get,
  mock,
  create,
  edit,
};
