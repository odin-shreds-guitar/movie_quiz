const Score = require("../models/moviequiz.model");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const scoreRoutes = require("../routes/moviequiz.routes");

module.exports = {

	createScore: (req, res) => {

        const newScoreObject = new Score(req.body);       
        // const score = new Score(req.body);       

		const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })
        newScoreObject.createdBy = decodedJWT.payload.id

		// console.log(req);

        // newScoreObject.createdBy = req.jwtpayload.id; //short version of above const decodedJwt code
        
        newScoreObject.save()
        // score.save()
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
		Score.find().sort({score:-1})
        // Score.find().sort()
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