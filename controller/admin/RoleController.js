const Role = require("../../models/rolesModel");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };
        const records = await Role.find(find);
        res.render("admin/page/roles/index", {
            records,
        });
    } catch (err) {
        console.log(err);
    }
};
module.exports.create = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };
        const records = await Role.find(find);
        res.render(`admin/page/roles/create`, {});
    } catch (err) {
        console.log(err);
    }
};
module.exports.createPost = async (req, res) => {
    try {
        let admin = systemConfig.prefixAdmin;
        console.log(admin);

        const record = new Role(req.body);
        await record.save();

        let find = { deleted: false };
        const records = await Role.find(find);

        res.render(`admin/page/roles/index`, {
            records,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi khi thêm vai trò");
    }
};
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {
            _id: id,
            deleted: false,
        };
        const data = await Role.findOne(find);
        console.log(data);
        res.render("admin/page/roles/edit", {
            data,
        });
    } catch (err) {
        console.log(err);
    }
};
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Role.updateOne({ _id: id }, req.body);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    res.redirect("/admin/roles");
};
module.exports.permission = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };
        const records = await Role.find(find);

        res.render("admin/page/roles/permission", {
            records,
        });
    } catch (err) { }
};
module.exports.permissionPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions);
        console.log(permissions)
        for (const item of permissions) {
            await Role.updateOne(
                {
                    _id: item.id,
                },
                {
                    permissions: item.permissions,
                }
            );
        }
        req.flash("success", "Cập nhật thành công ");
        res.redirect('back');
    } catch (err) {
        req.flash("error", "Cập nhật thất bại ");
    }
};
