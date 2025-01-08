const Product = require("../../models/ProductModel");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/productCategoryModels");

module.exports.index = async (req, res) => {
  try {
    let find = { deleted: false };

    //  Filter Status Code
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);

    //  Search Product
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);
    if (objectSearch.regex) {
      find.name = objectSearch.regex;
    }

    //  Filter  products status
    if (req.query.status) {
      find.status = req.query.status;
    }

    // Pagination
    const countProduts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItems: 2,
      },

      req.query,
      countProduts
    );
    // Sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort = { position: "desc" };
    }



    // Trường hợp đặc biệt: Nếu trang cuối có ít sản phẩm (ví dụ: 1 sản phẩm)
    const products = await Product.find(find || {})
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skipPages);
    res.render("admin/page/product/index", {
      products,
      filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  } catch (err) {
    console.log(err);
  }
};
//Change status

module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;
    const product = await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái sản phâm thành công ");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.handlerFormAction = async (req, res) => {
  try {
    const action = req.body.actionForm;
    const ids = req.body.showIdCheckBox.split(",");
    console.log(ids);
    console.log(action);
    switch (action) {
      case "Hoạt động":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: "Hoạt động" }
        );
        req.flash(
          "success",
          `Cập nhật trạng thái ${ids.length} sản phâm thành công `
        );
        break;

      case "Ngừng Hoạt Động":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: "Ngừng Hoạt Động" }
        );
        req.flash(
          "success",
          `Cập nhật trạng thái ${ids.length} sản phẩm thành công `
        );
        break;
      case "delete-all":
        await Product.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deleteAll: new Date() }
        );
        req.flash("success", `Xóa ${ids.length} sản phẩm thành công `);
        break;
      case "change-position":
        for (const item of ids) {
          let [id, position] = item.split("-");
          await Product.updateOne(
            { _id: id },
            { position: parseInt(position) }
          );
        }

        break;

      default:
        console.log("No action matched");
        break;
    }
    res.redirect("back");
  } catch (err) {
    // Log the error and respond with an appropriate message
    console.error("Error handling form action:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Product.updateOne(
      { _id: id },
      { deleted: true },
      { deletedAt: new Date() }
    );

    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// Get
module.exports.create = async (req, res) => {
  try {
    const category = await ProductCategory.find({ deleted: false });

    const newCategory = createTreeHelper.tree(category);
    res.render("admin/page/product/create", {
      category: newCategory
    });
  } catch (err) {
    console.error("Error in create controller:", err);
    res.status(500).json({ message: err.message });
  }
};

// Post
module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions
  if (permissions.includes('product-category_view')) {
    try {
      if (req.body.position == "") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
      } else {
        req.body.position = parseInt(req.body.position);
      }
      const product = new Product(req.body)
      await product.save();

      req.flash("success", "Sản phẩm đã được tạo thành công.");
      res.redirect(`/admin/product`);
    } catch (err) {
      console.error(err);
      req.flash("error", "Có lỗi xảy ra khi tạo sản phẩm.");
      res.status(500).render("admin/page/error", { error: err.message });
    }
  } else {
    return;
  }

};
module.exports.edit = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const find = {
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    console.log(product);

    res.render("admin/page/product/edit.pug", {
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// Edit Patch
module.exports.editPatch = async (req, res) => {
  if (permissions.includes('product-category_edit')) {
  try {

    const product = await Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    console.log(product);

    req.flash("success", "Sản phẩm đã được cập nhật thành công");
    res.redirect(`${systemConfig.prefixAdmin}/product`);

    next();
  } catch (err) {
    req.flash("error", "Có lỗi xảy ra khi cập nhật sản phẩm.");
  }}else{
    return;
  }
};
module.exports.details = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const find = {
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    console.log(product);

    res.render("admin/page/product/details.pug", {
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
