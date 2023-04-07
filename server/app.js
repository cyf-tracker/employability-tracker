const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// helmet

// cors
// connect to database
const connectToDB = async () => {
	mongoose.set("strictQuery", false);
	await mongoose
		.connect("mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + "/" + process.env.MONGO_DATABASE_NAME)
		.then(() => {
			console.log("Successfully connected to MongoDB Atlas!");
		})
		.catch((error) => {
			console.log("Unable to connect to MongoDB Atlas!");
			console.error(error);
		});
};

connectToDB();

const app = express();

app.use((req, res, next) => {
	console.log("Request received!");
	next();
});

app.use((req, res, next) => {
	res.status(201);
	next();
});

app.use((req, res, next) => {
	res.json({message: "Your request was successful!"});
	next();
});

app.use((req, res, next) => {
	console.log("Response sent successfully!");
});

module.exports = app;
