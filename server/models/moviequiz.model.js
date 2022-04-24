const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
	firstName : { type: String, required: [true, "First Name is required."]},
	lastName : { type: String, required: [true, "Last name is required."]},
    password: { type: String, required: [true, "Password is required, min 12 characters."], minlength: [8, "Password must be 8 characters or longer"]},
    email: { type: String, 
        required: [ true, "Email is required."],
        validate: { validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), message: "Please enter a valid email"}
    },
}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('User', UserSchema)


// comment schema
const CommentSchema = new mongoose.Schema({
	text : { type: String, required: [true, "Please enter a comment."]},
	date : { type: Date, default: Date.now},
    created_by: { type: String }, // this should have the user id of the person logged in
}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('Comment', CommentSchema)

// game schema
const GameSchema = new mongoose.Schema({

}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('Game', GameSchema)