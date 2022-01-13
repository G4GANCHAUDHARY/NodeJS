const mongoose=require("mongoose");
const schema=mongoose.Schema;

const userSchema = new schema({
    name:{type:String, required:true},
    email: { type:String, unique: true, required:true} ,
    isPromoted:{type:Boolean, default:null}
})

const users=mongoose.model("users",userSchema);

module.exports=users;