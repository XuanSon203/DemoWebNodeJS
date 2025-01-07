const ProductCategory = require("../../models/productCategoryModels");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const Account = require("../../models/account.Models");

module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };

    const category = await ProductCategory.find({});
    const newCategory = createTreeHelper.tree(category);
    // lấy thong tin người tạo 
    for (const item of category) {
      const user = await Account.findOne({
        _id: item.createdBy.account_id,
      });

      if (user) {
        item.accountFullName = user.fullName;
      }
      // lấy ra thông tin người sửa gần nhất
      const updatedBy = item.updatedBy.slice(-1)[0];
      console.log(updatedBy);
      if (updatedBy) {
        const userUpdated = await Account.findOne({
          _id: updatedBy.account_id,
        })
        updatedBy.accountFullName = userUpdated.fullName;

      }
     
    }
    res.render("admin/page/category/index.pug", {
      category: newCategory,
    });
  } catch (err) {
    console.error("Error retrieving categories:", err.message);
  }
};
module.exports.create = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);
    console.log(newCategory);
    res.render("admin/page/category/create.pug", {
      category: newCategory,
    });
  } catch (err) {
    console.error("Error retrieving categories:", err.message);
  }
};
module.exports.createPost = async (req, res) => {
  try {
    console.log(req.body);

    if (!req.body.position || isNaN(Number(req.body.position))) {
      const countCategory = await ProductCategory.countDocuments();
      req.body.position = countCategory + 1;
    } else {
      req.body.position = parseInt(req.body.position, 10);
    }
    req.body.createdBy = {
      account_id: res.locals.user.id,
    };

    const category = new ProductCategory(req.body);
    await category.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category/`);
  } catch (err) {
    console.error("Error creating category:", err.message);
    res.status(500).render("admin/page/error", {
      error: err.message,
    });
  }
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    let find = {
      _id: id,
      deleted: false,
    };
    const data = await ProductCategory.findOne(find);
    const category = await ProductCategory.find({
      deleted: false,
    });
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/page/category/edit", {
      data,
      category: newCategory,
    });
  } catch (err) {
    console.log("ERROR");
    res.redirect("/admin/product-category/");
  }
};
module.exports.editPatch = async (req, res) => {
  try {
    const updadtedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };
    const id = req.params.id;
    await ProductCategory.updateOne(
      {
        _id: id,
      },
      // code them lich su sua 
      {
        ...req.body,
        $push: { updadtedBy: updadtedBy },
      }
    );

    console.log(req.body);
    res.redirect("/admin/product-category/");
  } catch (err) { }
};
