const mongoose = require("mongoose");

const connect = () => {
  const url = `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}`;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  });

  mongoose.connection.once("open", async () => {
    console.log(`Connected to MongoDB at ${url}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Error connecting to MongoDB at ${url}\n`, err);
  });
};

const disconnect = () => {
  if (!mongoose.connection) {
    return;
  }

  mongoose.disconnect();

  mongoose.once("close", async () => {
    console.log("MongoDB DB");
  });
};

module.exports = {
  connect,
  disconnect,
};
