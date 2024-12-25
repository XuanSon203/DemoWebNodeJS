const express = require('express');
const router =express.Router();
const controllerCourses =  require("../../controller/client/CoursesController");
const homeCotroller = require("../../controller/client/HomeController");

router.get("/:slug",controllerCourses.show);
router.get("/",homeCotroller.index);


module.exports = router;