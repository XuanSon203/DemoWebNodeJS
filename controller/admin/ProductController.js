const Product = require("../../models/ProductModel");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
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

    // Trường hợp đặc biệt: Nếu trang cuối có ít sản phẩm (ví dụ: 1 sản phẩm)
    const products = await Product.find(find || {})
      .sort({ position: "desc" })
      .limit(objectPagination.limitItems) // Giới hạn số sản phẩm trên mỗi trang
      .skip(objectPagination.skipPages); // Bỏ qua số sản phẩm theo phân trang
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
    res.render("admin/page/product/create");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// Post
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position == "") {
      const countProduct = await Product.countDocuments();
      req.body.position = countProduct + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    // Lưu sản phẩm vào cơ sở dữ liệu
    await product.save();
    req.flash("success", "Sản phẩm đã được tạo thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  } catch (err) {
    console.error(err);
    // Trả lỗi nếu có vấn đề xảy ra trong quá trình lưu
    req.flash("error", "Có lỗi xảy ra khi tạo sản phẩm.");
    res.status(500).render("admin/page/error", { error: err.message });
  }
};
module.exports.edit = async (req, res,next) => {
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
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
   const product =  await Product.updateOne(
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
  }
};
module.exports.details = async (req, res,next) => {
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
