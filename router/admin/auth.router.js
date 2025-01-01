const express = require('express');

const router = express.Router();

const authController = require('../../controller/admin/AuthController');




// router.post("/login",authController.loginPost);
router.get("/logout",authController.logout);
router.post("/login",authController.loginPost);
router.get("/login",authController.login);

module.exports = router;