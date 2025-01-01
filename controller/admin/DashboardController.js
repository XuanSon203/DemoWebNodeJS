module.exports.index = (req,res)=> {
    try{
        res.render("admin/page/roles/index",{

        })
    }catch(err){
        console.log(err);
    }

};
