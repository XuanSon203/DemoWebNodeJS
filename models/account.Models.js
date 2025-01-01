const mongoose = require("mongoose");
const generrate = require("../helpers/generrate");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
   
    fullName:{type:String},
    password:String,
    email:String,
    token:{
        type:String,
        default:generrate.generateRandomString(20),
    },
    phone:String,
    avatar:String,
    role_id:String,
    status:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
