const mongoose = require('mongoose');

// quiz results schema
const QuizResultsSchema = new mongoose.Schema({
	score : { type: Integer, required: [true]},
    created_by: { type: String, required: [true, "Username is required."]}, // this should have the user id of the person logged in
}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('Comment', QuizResultsSchema)