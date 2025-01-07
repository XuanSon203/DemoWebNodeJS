const express = require("express");
const multer = require("multer");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const router = express.Router();

const myAccountController = require("../../controller/admin/MyAccountController");

router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  myAccountController.editPatch
);
router.get("/edit", myAccountController.edit);
router.get("/", myAccountController.index);

module.exports = router;
