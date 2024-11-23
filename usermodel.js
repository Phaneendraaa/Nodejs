const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongooseprac",{
    
});

const userSchema = mongoose.Schema({
    name: String,
    email:String,
    age:Number
})

module.exports = mongoose.model("user",userSchema);