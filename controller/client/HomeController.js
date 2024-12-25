const Courses = require("../../models/CoursesModels");

module.exports.index = async(req,res)=>{
    try {
        const courses = await Courses.find({});
        res.render("client/page/courses/index",{
            courses
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}