const homeRouter = require("./home");
const coursesRouter = require("./courses");

module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/courses", coursesRouter);
};
