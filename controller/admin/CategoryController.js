const ProductCategory = require("../../models/productCategoryModels");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  try {
    let find ={
      deleted: false,
    }
    
  
    const category = await ProductCategory.find({});
    const newCategory = createTreeHelper.tree(category);
    
    res.render("admin/page/category/index.pug", {
      category: newCategory
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
        res.render("admin/page/category/create.pug", { category:newCategory });
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
    const category = new ProductCategory(req.body);
    await category.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category/`);
  } catch (err) {
    console.error("Error creating category:", err.message);
    res.status(500).render("admin/page/error", { error: err.message });
  }
};
