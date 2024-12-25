const express = require('express');

const router = express.Router();

const homeController = require('../../controller/client/HomeController');
router.get("/",homeController.index);

module.exports = router;