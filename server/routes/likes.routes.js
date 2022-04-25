const LikesCon=require("../controllers/likes.controller");

module.exports=(app)=>{
    app.post("/api/likes", LikesCon.createLike);
    app.get("/api/likes/:com", LikesCon.findAllLikes);
    app.delete("/api/likes/:id",LikesCon.deleteLike)
}