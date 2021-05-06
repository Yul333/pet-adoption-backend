const express = require("express");
const Pet = require("../models/pet.model");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const User = require("../models/user.model");

// auth,
router.get("/myPets/:uid",  async (req, res, next) => {
	const userId = req.params.uid;
	try {
    const	myPets = await Pet.find({ userId });
    res.status(200).send(myPets);
	} catch (err) {
		throw new Error("could not find");
	}
	if (!myPets) {
		return res.status(404).json({ message: "no users found" });
	}

	// res.json({ myPets: myPets });

  res.send(myPets);
});


router.get("/", async (req, res, next) => {
	try {
		const allPets = await Pet.find();

		console.log(allPets);
		res.status(200).send(allPets);
	} catch (err) {
		next(err);
	}
});
router.post("/",auth, async (req, res) => {
	//auth,
	try {
		const {
			Type,
			Name,
			AdoptionStatus,
			Picture,
			Height,
			Weight,
			Color,
			Bio,
			Hypoallergenic,
			DietaryRestrictions,
			Breed,
		} = req.body;
		// const userId =  req.user.id

		const AddAPet = new Pet({
			Type,
			Name,
			AdoptionStatus,
			Picture,
			Height,
			Weight,
			Color,
			Bio,
			Hypoallergenic,
			DietaryRestrictions,
			Breed,
			//  userId
		});
		await AddAPet.save();
		res.send(AddAPet);
	} catch (err) {
		next(err);
	}
});

// router.get("/myPets", auth, async (req, res, next) => {
// 	// const userId = req.params.uid;
//   const userId = req.user.id;

// 	try {
// 	const	myPets = await Pet.find({ userId });
// 	} catch (err) {
// 		throw new Error("could not find");
// 	}
// 	if (!myPets) {
// 		return res.status(404).json({ message: "no users found" });
// 	}
// 
// 	// res.json({ myPets: myPets });
// });
// const userId = req.user._id;
// user = await user.findById(userId)

router.get("/:pid", async (req, res, next) => {
	const petId = req.params.pid;
	let pet;
	try {
		pet = await Pet.findById(petId);
	} catch (err) {
		throw new Error("could not find");
	}
	if (!pet) {
		return res.status(404).json({ message: "no pets found" });
	}

	res.json({ pet: pet });
});

router.delete("/:pid", async (req, res, next) => {
	const petId = req.params.pid;

	try {
		pet = await Pet.findByIdAndDelete(petId);
		res.status(200);
		res.send(pet);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
