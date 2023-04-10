const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const passwordValidator = require("password-validator");
let schema = new passwordValidator();

// signup
// login