const home = require("./home.router");
const categoryMiddlware = require("../../middlewares/client/category.middldware");

module.exports = (app) => {
    app.use(categoryMiddlware.category);
    app.use("/home", home);
};
