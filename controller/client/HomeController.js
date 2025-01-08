const ProductCategory = require("../../models/productCategoryModels");
const createTreeHelper = require("../../helpers/createTree");

module.exports.index =async (req,res)=> {
    try{
       res.render("client/page/home/index",{
       })
    }catch(err){
        console.log(err);
    }

};
