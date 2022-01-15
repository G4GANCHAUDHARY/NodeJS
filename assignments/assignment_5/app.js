const express=require("express");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Instaclone");
const users=require("./models/users");
const loginroute=require("./routes/login");
const useroute=require("./routes/user");
const postroute=require("./routes/post");
var jwt = require("jsonwebtoken");
const secret="RestApi";

const app=express();

app.use("/api/v1/posts",async (req,res,next)=>{
    // console.log(req.headers)
    const token=await req.headers.authorization.split("test ")[1];
    // console.log(token)
    if (!token){
        return res.json({
            status:"failed",
            message:"Invalid Authorization"
        })
    }
    jwt.verify(token, secret, async function(err,decoded){
        try{
            // req.body.user=decoded.data;
            const user=await users.findById({_id:decoded.data})
            req.body.user=user.id;
            // console.log(decoded)
        } catch(err){
            res.json({
                status:"failed",
                message:"Incorrect token"
            })
        }
    })
    next();
})


app.use("/api/v1/",loginroute)
app.use("/api/v1/users",useroute)
app.use("/api/v1/posts",postroute)


app.listen(3000)