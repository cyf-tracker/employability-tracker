const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

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

// set headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

module.exports = app;
