const express = require('express');
const multer = require("multer");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

const accountController = require('../../controller/admin/AccountController');


router.patch(
    "/edit/:id",
    upload.single("avatar"), 
    uploadCloud.upload, 
    accountController.editPatch 
  );
router.get("/edit/:id", accountController.edit); 
router.post(
  "/create",
  upload.single("avatar"), 
  uploadCloud.upload, 
  accountController.createPost 
);
router.get("/create", accountController.create); 
router.get("/", accountController.index); 

module.exports = router;
