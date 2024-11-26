const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/signuppractice");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    rollno: String,
})

module.exports = mongoose.model("user",userSchema);