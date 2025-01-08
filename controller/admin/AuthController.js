const Account = require("../../models/account.Models");
var md5 = require('md5');

module.exports.login = (req, res) => {
    try {
        // Check token
        console.log(req.cookies.token);
        if (req.cookies.token) {
            res.render("admin/page/dashboard/index");
        } else {
            res.render("admin/page/auth/login");
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Account.findOne({
            email: email,
            deleted: false
        });
        if (!user) {
            req.flash("error", "Email không tồn tại ");
            res.redirect("back");
            return;
        }
        if (md5(password) !== user.password) {
            req.flash("error", 'Mật khẩu không chính xác');
            res.redirect("back");
        }
        if (user.status == "inactive") {
            req.flash("error", 'Tài khoản đã bị khóa ');
            res.redirect("back");
        }
        res.cookie("token", user.token);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.log(err);
    }

};
module.exports.logout = (req, res) => {
    try {
        // Xoa token cookie 
        res.clearCookie("token");
        res.render("admin/page/auth/login", {
        })
    } catch (err) {
        console.log(err);
    }

};