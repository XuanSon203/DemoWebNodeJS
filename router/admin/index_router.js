const dashboardRouter=  require('./dashboard');
const productRouter=  require('./product');
const systemConfig = require('../../config/system');
const productCategory =require('./product_category');
const roleRouter = require('./role.router');
const accountRouter = require('./account.router');
const authRouter = require('./auth.router');
module.exports = (app )=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN+ '/dashboard', dashboardRouter);
    app.use(PATH_ADMIN+ '/product', productRouter);
    app.use(PATH_ADMIN+ '/product-category', productCategory);
    app.use(PATH_ADMIN+ '/roles', roleRouter);
    app.use(PATH_ADMIN+ '/account', accountRouter);
    app.use(PATH_ADMIN+ '/auth', authRouter);
    
};
