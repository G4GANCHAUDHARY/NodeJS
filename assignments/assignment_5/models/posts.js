const mongoose=require("mongoose");
const schema=mongoose.Schema;

const postSchema=new schema({
    title:{type:String,required:true},
    body:{type:String},
    image:{type:String,required:true},
    user:{type:schema.Types.ObjectId ,ref:"User",required:true}
})

const posts=mongoose.model("posts",postSchema)

module.exports=posts;