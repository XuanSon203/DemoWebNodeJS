module.exports.createPost = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    req.flash("error", "Tên sản phẩm và giá là bắt buộc.");
    return res.redirect("back");
  }

  // Kiểm tra giá trị price có hợp lệ không
  if (isNaN(req.body.price) || req.body.price <= 0) {
    req.flash("error", "Giá sản phẩm phải là một số lớn hơn 0.");
    return res.redirect("back");
  }

  next();
};
