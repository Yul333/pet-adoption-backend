const express = require("express");
const router = express.Router();
// const { check } = require("express-validator");
// const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
	const { firstName, lastName, email, password, phoneNumber } = req.body;
	const hashedPassword = await bcrypt.hash(password, 8);
	try {
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phoneNumber,
            
		});
		console.log(newUser);
		res.send(newUser);
	} catch (error) {
		console.log(error);
	}
});

//login

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (!existingUser) {
			const error = new Error(
				"Invalid credentials, could not log you in.",
				401
			);
			return next(error);
		}
		console.log(existingUser.password);
		bcrypt.compare(password, existingUser.password, (err, result) => {
            
			console.log(result);
			if (err) next(err);
			else {
				if (result) {
					const token = jwt.sign({ id: existingUser._id }, "secret");
					res.send({ token, user: existingUser });
				}
			}
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;


//		 "firstName":"momo",
//  "lastName":"popo",
//  "email":"sosos",
//  "password": "hashedPassword",
//  "phoneNumber":"098988

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGZmZGU3ZDZiMjAxNTAzODBhN2YwOCIsImlhdCI6MTYyMDA0OTQwM30.FuTexxdztwZD90NBKoIM0vHIcXovy-m7Wk5sl3ZRbkQ"