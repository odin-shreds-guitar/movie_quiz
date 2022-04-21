const mongoose = require('mongoose');



// game schema
const GameSchema = new mongoose.Schema({
	firstName : { type: String, required: [true, "First Name is required."]},
	lastName : { type: String, required: [true, "Last name is required."]},
    password: { type: String, required: [true, "Password is required, min 12 characters."], min: 12},
    email: { type: String, required: [true, "Email is required."], min: 12},

}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('Project', GameSchema)