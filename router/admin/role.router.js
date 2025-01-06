const express = require('express');

const router = express.Router();

const roleController = require('../../controller/admin/RoleController');



router.patch("/permissions",roleController.permissionPatch);
router.get("/permissions",roleController.permission);
router.patch("/edit/:id",roleController.editPatch);
router.get("/edit/:id",roleController.edit);
router.post("/create",roleController.createPost);
router.get("/create",roleController.create);
router.get("/",roleController.index);

module.exports = router;