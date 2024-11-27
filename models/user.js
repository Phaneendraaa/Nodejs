const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dataassociationprac");

const userschema = mongoose.Schema({
    username:String,
    email:String,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
       
    }]
})

module.exports = mongoose.model("userModel",userschema);