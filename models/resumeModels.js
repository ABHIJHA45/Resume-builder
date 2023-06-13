const mongoose = require("mongoose");

const resumeModels = new mongoose.Schema({
    name:String,
    email: String,
    profile:String,
    contact:Number,
    linkedin:String,
    github:String,
    skill:String,
    experience:String,
    project:String,
    education:String,
});

module.exports= mongoose.model("resume",resumeModels );