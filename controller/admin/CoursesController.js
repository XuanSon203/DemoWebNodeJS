const Courses = require("../../models/CoursesModels");
module.exports.index =async (req,res)=> {
    try{
        const courses = await Courses.find({});
        res.render("admin/page/courses/index",{
            courses
        });
    }catch(err){
        console.log(err);
    };

};
