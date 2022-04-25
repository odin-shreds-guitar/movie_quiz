const mongoose= require("mongoose")

const LikesSch= new mongoose.Schema({
    user:{
        type:String,
        required:[true,"this is required"]
    },
    comment:{
        type: String
    }
},{timestamps:true})
const Likes = mongoose.model("Likes",LikesSch);
module.exports=Likes;