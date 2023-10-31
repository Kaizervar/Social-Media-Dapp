const mongoose=require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
})

const newSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)
module.exports=collection