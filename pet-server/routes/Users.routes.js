const express = require("express");
const router = express.Router();
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

router.put("/account/:id", async (req, res, next) => {
console.log(req.body.data)
const {firstName} =(req.body.data)
console.log(firstName)
let user 
// = await User.findById(req.params.id);
// user = await User.findById(id);
try {
		 user = await User.findById(req.params.id);
	  } catch (err) {
		const error = new Error (
		  'Something went wrong, could not update user.',
		  500 
		);
		return next(error);
	  }
	  console.log(user)
	  user.firstName = firstName;
	//   user.email = email;
	  await user.save();
	  
	  try{
		await user.save();
		res.send('updated').json({User : user})
	  } catch(err){
		return next(error);
	  
	  
	  
	  }
	  
	// if (user) {
	// 	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
	// 		new: true,
	// 		runValidators: true,
	// 	});
	// 	res.status(200);
	// 	res.json(updatedUser);
	// } else {
	// 	res.status(500);
	// 	throw new Error("Updated Failed");
	// }
});



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

