const express = require('express');

const router = express.Router();

const dashboardController = require('../../controller/admin/DashboardController');
router.get("/",dashboardController.index);

module.exports = router;