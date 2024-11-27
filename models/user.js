const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/signupprac", {

})
const userschema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

module.exports = mongoose.model("userModel",userschema);