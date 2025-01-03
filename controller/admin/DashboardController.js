module.exports.index = (req,res)=> {
    try{
       res.render("admin/page/dashboard/index")
    }catch(err){
        console.log(err);
    }

};
