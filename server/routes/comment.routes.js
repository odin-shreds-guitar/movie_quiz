const  CommentCon=require("../controllers/comment.controller");

module.exports=(app)=>{
    app.post("/api/comments", CommentCon.createComment);
    app.get("/api/comments/:id", CommentCon.findAllComments);
    app.delete("/api/comments/:id", CommentCon.deleteComment)
}