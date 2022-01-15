const express=require("express");
const router= express.Router();
const users=require("../models/users");
const { body, validationResult } = require('express-validator');
const bodyParser=require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret="RestApi"

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post("/register",body("email").isEmail(),body("password"),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            try{
                const user=await users.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                })
                res.json({
                    status:"success",
                    data:user,
                })
            }catch(err){
                res.json({
                    status:"Failed to hash",
                    message:err.message
                })
            }
        });
    } catch(e){
        res.json({
            status:"Failed to Post",
            message:e.message
        })
    }
})

router.get("/login",body("email").isEmail(),body("password"),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user= await users.findOne({email:req.body.email})
        bcrypt.compare(req.body.password, user.password, async function(err, hash) {
            try{
                const token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                res.json({
                    status:"success",
                    data:token
                })
            }catch(err){
                res.json({
                    status:"Invalid credentials",
                    message:err.message
                })
            }
        });
    } catch(e){
        res.json({
            status:"Failed to fetch",
            message:e.message
        })
    }
})

module.exports=router;