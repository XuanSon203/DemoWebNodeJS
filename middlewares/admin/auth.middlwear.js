const Account = require('../../models/account.Models.js');
module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.render("admin/page/auth/login")
    } else {
        console.log(req.cookies.token);
        const user = await Account.findOne({
            token: req.cookies.token
        });
        console.log(user);
        if (!user) {
            res.render("admin/page/auth/login")
        } else {
            next();
        }
    }
}