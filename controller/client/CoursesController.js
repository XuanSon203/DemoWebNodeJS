const Course = require("../../models/CoursesModels");

module.exports.show = async (req,res)=>{
    try {
        const details = await Course.findOne({slug: req.params.slug});
        
        res.render('client/page/courses/show',{
            details: details,
        });
    } catch (error) {
        res.status(500).send("Server Error");
    }
};