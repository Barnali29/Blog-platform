import mongoose from "mongoose";

const postSchema= mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type:String
    },
    categories:[{
       type:mongoose.Schema.Types.ObjectId, 
       ref:"Category",
        required:true
    }],
    status:{ // options : draft , submitted , Approved (after approval)
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    comments:[{
       comment:{type:String, required:true},
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       }
    }],
    numOfLikes:{
        type:Number,
        required:true,
        default:0
    }
})

const Post = mongoose.model("Post",postSchema)
export default Post