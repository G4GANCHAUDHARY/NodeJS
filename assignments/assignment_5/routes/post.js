const express=require("express");
const router= express.Router();
const posts=require("../models/posts");
const { body, validationResult } = require('express-validator');
const bodyParser=require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/",async (req,res)=>{
    try{
        const post=await posts.find();
        res.json({
            status:"success",
            data: post
        })
    } catch(e){
        res.json({
            status:"Failed",
            message: "Failed to fetch post"
        })
    }
})

router.post("/",async (req,res)=>{
    try{
        const post=await posts.create(req.body);
        res.json({
            status:"success",
            data: post
        })
    } catch(e){
        res.json({
            status:"Failed",
            message: "Failed to create post"
        })
    }
})

router.put("/:id",async (req,res)=>{
    try{
        await posts.findByIdAndUpdate({_id:req.params.id},{
            title:req.body.title,
            body:req.body.body,
            image:req.body.image
        });
        res.json({
            status:"success",
            message: "updated post"
        })
    } catch(e){
        res.json({
            status:"Failed",
            message: "Failed to update post"
        })
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        await posts.findByIdAndDelete({_id:req.params.id});
        res.json({
            status:"success",
            message: "deleted post"
        })
    } catch(e){
        res.json({
            status:"Failed",
            message: "Failed to delete post"
        })
    }
})


module.exports=router;