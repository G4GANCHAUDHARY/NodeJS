const express=require("express");
const mongoose=require("mongoose");
const users=require("./model/user")
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
mongoose.connect('mongodb://localhost:27017/Users');
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});
const app=express();

app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get("/",async (req,res)=>{
    var data= await users.find()
    res.render("index",{data})
})

app.post("/users/add",async (req,res)=>{
    console.log(req.body)
    await users.create({
        name:req.body.name,
        email:req.body.email,
        isPromoted:null
    })
    res.redirect("/")
})

app.put("/users/:id", async (req,res)=>{
    let human=await users.findOne({_id:req.params.id})
    console.log(human)
    if (human.isPromoted==null){
        await users.updateOne({_id:req.params.id},{isPromoted:true})
    } else if (human.isPromoted){
        await users.updateOne({_id:req.params.id},{isPromoted:false})
    } else {
        await users.updateOne({_id:req.params.id},{isPromoted:true})
    }
    res.redirect("/")
})

app.delete("/users/:id", async (req,res)=>{
    let human=await users.findOne({_id:req.params.id})
    console.log(human)
    if (human.isPromoted==false){
        await users.deleteOne({_id:req.params.id})
    }
    res.redirect("/")
})

app.listen(3000);