const fs = require("fs");
const path = require("path");

const directoriesInDirectory = (dir) =>
  fs.readdirSync(path.resolve(dir), { withFileTypes: true }).reduce((acc, item) => {
    if (!item.isDirectory()) return acc;
    acc.push(item.name);
    const children = directoriesInDirectory(`${dir}/${item.name}`).map((o) => `${item.name}/${o}`);
    return [...acc, ...children];
  }, []);

module.exports = {
  applyRoutes: (app) => {
    directoriesInDirectory(__dirname).map((dir) =>
      app.use(`/api/${dir}`, require(`@controllers/${dir}`)),
    );
  },
};
