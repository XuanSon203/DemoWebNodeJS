const ProductCategory = require("../../models/productCategoryModels");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  try {
    const category = await ProductCategory.find({});
    console.log(category);
    res.render("admin/page/category/index.pug", {
      category,
    });
  } catch (err) {
    console.error("Error retrieving categories:", err.message);
  }
};
module.exports.create = async (req, res) => {
  try {
    res.render("admin/page/category/create.pug", {});
  } catch (err) {}
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
    const category = new ProductCategory(req.body);
    await category.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category/`);
  } catch (err) {
    console.error("Error creating category:", err.message);
    res.status(500).render("admin/page/error", { error: err.message });
  }
};
