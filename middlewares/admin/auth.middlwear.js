const Account = require("../../models/account.Models.js");
const Role = require("../../models/rolesModel");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.render("admin/page/auth/login");
    } else {
        console.log(req.cookies.token);
        const user = await Account.findOne({
            token: req.cookies.token,
        }).select("-password");
        console.log(user);
        if (!user) {
            res.render("admin/page/auth/login");
        } else {
           const role = await Role.findOne({
            _id:user.role_id
           }).select("title permissions");
           res.locals.user= user;
           res.locals.role= role;
          console.log(role)
            next();
        }
    }
};
