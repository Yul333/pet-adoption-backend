const express = require('express');
const Pet = require("../models/pet.model")
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allPets = await Pet.find();
    console.log(allPets)
    res.status(200).send(allPets);
  } catch(err) {
    next(err); 
  }
});

router.post('/', async (req, res) => {
  const newPet = new Pet({
    name: req.body.name,
    type: req.body.type,
    status: req.body.status
  })
  await newPet.save();
  res.send(newPet);
})


module.exports = router;