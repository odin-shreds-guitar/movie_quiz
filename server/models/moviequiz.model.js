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

// game schema
const GameSchema = new mongoose.Schema({
	firstName : { type: String, required: [true, "First Name is required."]},
	lastName : { type: String, required: [true, "Last name is required."]},
    password: { type: String, required: [true, "Password is required, min 12 characters."], min: 12},
    email: { type: String, required: [true, "Email is required."], min: 12},

}, { timestamps: true, versionKey: false});
module.exports = mongoose.model('Project', GameSchema)