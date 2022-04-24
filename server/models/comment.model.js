const mongoose= require("mongoose");

const CommentSch= new mongoose.Schema({
    message:{
        type:String,
        require:[true, "please enter comment"],
        maxlength: [60,"Comment is too long"]
    },
    profile:{
        type:String,
        required:[true,"this is required"]
    },
    createdBy:{
        type:String
        
    },
    username:{
        type:String
    }
},{timestamps:true})
const Comment = mongoose.model("Comment", CommentSch);
module.exports=Comment;