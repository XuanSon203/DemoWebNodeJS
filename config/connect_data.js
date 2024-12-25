const mongoose = require("mongoose");
module.exports.connect= async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL,{
          
        });
        console.log("Connect MongoDB success");
    }catch(Error){

        console.log("Connect don't MongoDB Faile");

    };
};