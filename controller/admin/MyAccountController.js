const Account = require("../../models/account.Models");
var md5 = require('md5');
module.exports.index = async(req,res)=>{
    res.render("admin/page/myaccount/index");

}
module.exports.edit = async(req,res)=>{
    res.render("admin/page/myaccount/edit");
    
}
module.exports.editPatch = async (req, res) => {
    try {
        const id = res.locals.user.id;
        
         const emailExist = await Account.findOne({
            _id:{$ne:id},
            email: req.body.email,
            deleted: false
        });
        if(emailExist){
            console.log(`Email ${req.body.email} đã tồn tại `);
            res.redirect('back');
        }else{
            if (req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }
            await Account.updateOne({ _id: id },
                req.body
            );
         res.redirect('back')
            console.log(req.body);
        }
       
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi khi thêm vai trò");
    }
};