const express = require("express");
// read  data file from system path
const multer = require("multer");
// const strorageMulter = require("../../helpers/storageMulter");
const validate = require("../../validate/admin/product_validate");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const upload = multer();

  cloudinary.config({ 
      cloud_name: 'drdhsrxch', 
      api_key: '875412132991393', 
      api_secret: '<your_api_secret>'
  });
const productController = require("../../controller/admin/ProductController");

router.get("/details/:id", productController.details);

router.patch(
  "/edit/:id",
  upload.single("image"),
  validate.createPost,
  productController.editPatch
);

router.get("/edit/:id", productController.edit);

router.post(
  "/create",
  upload.single("image"),
  function (req, res, next) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      console.log(result)
    }
    upload(req);
  },
  validate.createPost,
  productController.createPost
);
router.get("/create", productController.create);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.delete("/delete/:id", productController.deleteItem);
router.patch("/handle-form-actions", productController.handlerFormAction);
router.get("/", productController.index);

module.exports = router;