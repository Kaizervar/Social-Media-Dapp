const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())





app.get("/login",cors(),(req,res)=>{
})



app.post("/login",async(req,res)=>{

    const{userName,password}=req.body

    try{
        const check=await collection.findOne({userName:userName})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notExist")
        }
    }

    catch(e){
        res.json("fail")
    }

})


app.post("/signup",async(req,res)=>{
    const{userName,password}=req.body

    const data={
        userName:userName,
        password:password
    }

    try{
        const check=await collection.findOne({userName:userName})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notExist")

            await collection.insertMany([data])
        }
    }

    catch(e){
        res.json("fail")
    }
})

app.listen(8001,()=>{
    console.log("port connected");
})