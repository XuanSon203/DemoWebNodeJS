const Account = require("../../models/account.Models");
const systemConfig = require("../../config/system");
var md5 = require('md5');
const Role = require("../../models/rolesModel");

module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false,
        }
        const records = await Account.find(find).select("-password -token");
        for (const record of records) {
            const role = await Role.findOne({

                deleted: false,
            });
            record.role = role;

        }
        console.log(records);
        res.render("admin/page/account/index", {
            records
        });
    } catch (err) {
        console.log(err);
    }
};
// Get
module.exports.create = async (req, res) => {
    try {
        let find = {
            deleted: false,
        }
        const roles = await Role.find(find);
        res.render(`admin/page/account/create`, {
            roles
        });
    } catch (err) {
        console.log(err);
    }
};
// Post
module.exports.createPost = async (req, res) => {
    try {
        // Check Email
        const emailExist = await Account.findOne({
            email: req.body.email,
            deleted: false
        });

        if (emailExist) {
            console.log(`Email ${req.body.email} đã tồn tại `);
            res.redirect('back');
        } else {
            req.body.password = md5(req.body.password);
            const records = new Account(req.body);

            await records.save();
            res.render(`admin/page/account/index`, {

            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi khi thêm vai trò");
    }
};
// GET
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {

            deleted: false,
        }
        const roles = await Role.find(find);
        const records = await Account.findOne(find);
        console.log(records);
        res.render("admin/page/account/edit", {
            records,
            roles
        })
    } catch (err) {
        console.log(err);
    }
};
// Patch
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
         // Check Email
         const emailExist = await Account.findOne({
            _id:{$ne:id},// kiem tra cac san pham co id khac 
            email: req.body.email,
            deleted: false
        });
        if(emailExist){
            console.log(`Email ${req.body.email} đã tồn tại `);
            res.redirect('back');
        }else{
            if (req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }
            await Account.updateOne({ _id: id },
                req.body
            );
            res.redirect("back");
            console.log(req.body);
        }
       
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi khi thêm vai trò");
    }
};