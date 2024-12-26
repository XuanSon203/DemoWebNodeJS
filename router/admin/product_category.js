const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

const categoryController = require("../../controller/admin/CategoryController");

router.get("/",categoryController.index);
router.get("/create",categoryController.create);
router.post(
  "/create",
  upload.single("image"),
  uploadCloud.upload,
  categoryController.createPost
);
module.exports = router;