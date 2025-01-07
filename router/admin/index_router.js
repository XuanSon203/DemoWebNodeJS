const dashboardRouter = require("./dashboard");
const productRouter = require("./product");
const systemConfig = require("../../config/system");
const productCategory = require("./product_category");
const roleRouter = require("./role.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const authMiddleware = require("../../middlewares/admin/auth.middlwear");
const myAccountRouter = require("./myaccount.router");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(
        PATH_ADMIN + "/dashboard",
        authMiddleware.requireAuth,
        dashboardRouter
    );
    app.use(PATH_ADMIN + "/product", authMiddleware.requireAuth, productRouter);
    app.use(
        PATH_ADMIN + "/product-category",
        authMiddleware.requireAuth,
        productCategory
    );
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRouter);
    app.use(PATH_ADMIN + "/account",authMiddleware.requireAuth, accountRouter);
    app.use(PATH_ADMIN + "/auth", authRouter);
    app.use(PATH_ADMIN + "/my_account",authMiddleware.requireAuth,myAccountRouter);
};
