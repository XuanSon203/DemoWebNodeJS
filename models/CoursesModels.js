const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: "hahaha" },
    description: { type: String },
    instructor: { type: String },
    image: { type: String, default: "No Image" },
    slug: { type: String, slug: "name" },
    videoID: { type: String },
    Trinhdo:{type:String},


},{
    timestamps: true,
   
});

const courses = mongoose.model('Course',Course);
module.exports = courses;