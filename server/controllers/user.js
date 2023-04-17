const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const passwordValidator = require("password-validator");
let schema = new passwordValidator();


schema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(20) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits(2) // Must have at least 2 digits
	.has()
	.not()
	.spaces() // Should not have spaces
	.is()
	.not()
	.oneOf(["Passw0rd", "Password123", "password", "Password"]); // Blacklist these values

exports.signup = (req, res, next) => {
	if (!schema.validate(req.body.password)) {
		return res.status(401).json({
			error: new Error("Your password must be a minimum of 8 characters and include both upper and lowercase letters, no spaces and 2 digits"),
		});
	} else {
		bcrypt.hash(req.body.password, 10).then((hash) => {
			const user = new User({
				email: req.body.email,
				username: req.body.username,
				password: hash,
				firstname: req.body.firstname,
				surname: req.body.surname,
				isVolunteer: req.body.isVolunteer	
			});
			user
				.save()
				.then(() => {
					res.status(201).json({
						message: "User added successfully",
					});
				})
				.catch((error) => res.status(400).json({error}))
				.catch((error) => res.status(500).json({error}));
		});
	}
};

exports.login = (req, res, next) => {
	User.findOne({email: req.body.email})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error("User not found!"),
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error("Incorrect password!"),
						});
					}

					const token = jwt.sign({userId: user._id}, process.env.TOKEN, {expiresIn: "24h"});
					res.status(200).json({
						userId: user._id,
						token: token,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

// logout

exports.logout = (req, res, next) =>{

}
// delete

exports.delete = (req, res, next) => {

}
//  update
exports.update = (req, res, next) => {
	
}