const mongoose = require('mongoose');

// quiz results schema
const ScoreSchema = new mongoose.Schema({

	score : { type: Number 
            // required: [true]
        },

    createdBy: {
        // type: String, 
        // required: [true, "Username is required."],
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, // this should have the user id of the person logged in

}, { timestamps: true, versionKey: false});
// }, { timestamps: true});

const Score = mongoose.model('Score', ScoreSchema)

module.exports = Score;