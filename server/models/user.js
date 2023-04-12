const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	username: {type: String, required: true, unique: true},
	firstname: {type: String, required: true},
	surname: {type: String, required: true},
	isVolunteer: {type: Boolean, required: true, default: false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
