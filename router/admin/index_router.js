const dashboardRouter=  require('./dashboard');
const coursesRouter=  require('./courses');
const productRouter=  require('./product');
const systemConfig = require('../../config/system');
module.exports = (app )=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN+ '/dashboard', dashboardRouter);
    app.use(PATH_ADMIN+ '/courses', coursesRouter);
    app.use(PATH_ADMIN+ '/product', productRouter);
    
};
