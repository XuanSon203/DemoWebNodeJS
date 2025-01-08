const ProductCategory = require("../../models/productCategoryModels");
const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async(req,res,next)=>{
    try {
        const category = await ProductCategory.find({
            deleted:false
        });
        res.locals.layoutCategory = createTreeHelper.tree(category);
        next();
    } catch (error) {
        
    }
}