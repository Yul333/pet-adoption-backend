const express = require("express");
const router = express.Router();
// const { check } = require("express-validator");
// const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const editedUser = require("../models/editAccount.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/:id", async (req, res) => {
	const userId = req.params.id;
	const user = await User.findById(userId);
	res.status(200).send(user);
});

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

router.put("/account/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200);
		res.json(updatedUser);
	} else {
		res.status(500);
		throw new Error("Updated Failed");
	}
});

// router.put("/account", async (req, res, next) => {
// 	const { firstName, lastName, email, password, phoneNumber } = req.body;
// 	const hashedPassword = await bcrypt.hash(password, 8);
// 	try {
//         function updateRecord(req, res) {
//             User.findOne({_id:req.body.id},(err,doc)=>{
//              //this will give you the document what you want to update.. then
//             doc.firstName = req.body.firstName; //so on and so forth

// 		// const editedUser = await User.findOneAndUpdate({
// 		// 	firstName,
// 		// 	lastName,
// 		// 	email,
// 		// 	password: hashedPassword,

// 		// 	phoneNumber,

// 		});
//      		} 		console.log(editedUser);
// 		res.save(updateRecord);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });
// // function updateRecord(req, res) {
//     User.findOne({_id:req.body.id},(err,doc)=>{
//      //this will give you the document what you want to update.. then
//     doc.name = req.body.name; //so on and so forth

//     // then save that document
//     doc.save(callback);

//     });

//     }

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

//456 token
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTE2ODRmNzNkZjFhNDQxOGY4OTc5NSIsImlhdCI6MTYyMDIzODY3NX0.EJ7AcCgOzNdOlNAy1dgX_ihqcei1dcZ8OsPdwN8VcSw"

//id 456
//6091684f73df1a4418f89795
//6091684f73df1a4418f89795
//id zemesh
//608ead3137f2da59f4f1d8e9
