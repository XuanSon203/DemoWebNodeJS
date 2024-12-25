const express = require('express');

const router = express.Router();

const coursesController = require('../../controller/admin/CoursesController');
router.get("/",coursesController.index);

module.exports = router; 