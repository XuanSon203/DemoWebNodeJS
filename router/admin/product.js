const express = require("express");
const multer = require("multer");
const validate = require("../../validate/admin/product_validate");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

const productController = require("../../controller/admin/ProductController");

router.get("/details/:id", productController.details);
router.patch(
  "/edit/:id",
  uploadCloud.upload,
  validate.createPost,
  productController.editPatch
);
router.get("/edit/:id", productController.edit);
router.post(
  "/create",
  upload.single("image"),
  uploadCloud.upload,
  validate.createPost,
  productController.createPost
);
router.get("/create", productController.create);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.delete("/delete/:id", productController.deleteItem);
router.patch("/handle-form-actions", productController.handlerFormAction);
router.get("/", productController.index);

module.exports = router;
