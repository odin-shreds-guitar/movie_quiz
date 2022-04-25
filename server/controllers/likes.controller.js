const Likes = require("../models/likes.model");

module.exports={
    findAllLikes: (req,res)=>{
        Likes.find({comment: req.params.com})
        .then((allLikes)=>{
            console.log(allLikes);
            res.json(allLikes);
        }).catch((err)=>{res.json({message:"error in find all likes", err:err})})
    },
    createLike: (req,res)=>{
        Likes.create(req.body).then((newLike)=>{
            console.log(newLike);
            res.json(newLike);
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },
    deleteLike: (req,res)=>{
        Likes.deleteOne({_id: req.params.id})
        .then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteLike", err:err})})
    }
}