// const Project = require('../models/projectmgr.model')

const Score = require("../models/moviequiz.model");
const jwt = require("jsonwebtoken");
// const jwtpayload = require("jsonwebtoken");
const User = require("../models/user.model");
const scoreRoutes = require("../routes/moviequiz.routes");

module.exports = {

	// response.json({
	// 	message: "Index from controller working as expected"
	// })

	createScore: (req, res) => {

        const newScoreObject = new Score(req.body);       

		const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })
        newScoreObject.createdBy = decodedJWT.payload.id
		console.log(req);
        // newScoreObject.createdBy = req.jwtpayload.id;
        
        newScoreObject.save()
            .then((newScore) => {
                console.log(newScore);
                res.json(newScore)
            })
            .catch((err) => {
                console.log("Something went wrong in createScore");
                res.status(400).json(err);
            })
    },

    getOneScore: (req, res) => {
        Score.findOne({_id: req.params.id})
            // .populate("messages", "content likes")
            .then((oneScore) => {
                console.log(oneScore);
                res.json(oneScore)
            })
            .catch((err) => {
                console.log("findOne Score Failed");
                res.json({ message: 'Something went wrong in getOneScore', error: err});
            })
    },
    
    getAllScores: (req, res) => {
        Score.find().sort()
            // .populate("createdBy", "username email")
            // .populate("messages", "content _id")
            .then((allScores) => {
                res.json(allScores)
            })
            .catch((err) => {
                console.log("getAllScores Failed");
                res.status(400).json("Something went wrong in getAllScores");
            })
    },
    
    deleteScore: (req, res) => {
        Score.deleteOne({_id: req.params.id})
        .then((deletedScore) => {
            res.json(deletedScore)
        })
        .catch((err) => {
            console.log("deleteScore Failed");
            res.status(400).json("Something went wrong in deleteScore");
        })
    },
    

    findAllScoresByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username) {
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn) => {
                    Score.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allScoresFromUser) => {
                            console.log(allScoresFromUser);
                            res.json(allScoresFromUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
                }
                else {
                    Score.find({createdBy: req.jwtpayload.id})
                        .populate("createdBy", "username")
                        .then((allScoresFromLoggedInUser) => {
                            console.log(allScoresFromLoggedInUser);
                            res.json(allScoresFromLoggedInUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                    })
        }
    },


}