const express=require("express");
const users=require("../models/users");
const bodyParser=require("body-parser");
const { body, validationResult } = require('express-validator');
const router= express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/",async (req,res)=>{
    try{
        const data=await users.find();
        res.json({
        status:"success",
        message:"Fetched Successfully",
        content:data
        })
    } catch(e){
        res.json({
            status:"Failed to fetch",
            message:e.message
        })
    }
})

router.post("/",body("email").isEmail(), async (req,res)=>{
    console.log(req.body)
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var data=await users.create({
            name :  req.body.name,
            email : req.body.email,
            password : req.body.password
        });
        res.json({
            status:"success",
            message:"Created successfully",
            content:data
        })
    } catch(e){
        res.json({
            status:"Failed to create",
            message:e.message
        })
    }
})

router.put("/:id", async (req,res)=>{
    console.log(req.body)
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var data=await users.findByIdAndUpdate({_id:req.params.id},{
            name :  req.body.name,
            email : req.body.email,
            password : req.body.password
        });
        res.json({
            status:"Success",
            message:"updated successfully",
        })
    } catch(e){
        res.json({
            status:"Failed to update",
            message:e.message
        })
    }
})


router.delete("/:id", async (req,res)=>{
    // console.log(req.body)
    try{
        await users.findByIdAndDelete({_id:req.params.id});
        res.json({
            status:"Success",
            message:"deleted succesfully",
        })
    } catch(e){
        res.json({
            status:"Failed to delete",
            message:e.message
        })
    }
})

module.exports=router;