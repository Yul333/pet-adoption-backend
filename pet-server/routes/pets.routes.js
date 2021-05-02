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

router.get('/:pid', async (req, res, next) => {
  const petId = req.params.pid;
  let pet;
  try {
      pet = await Pet.findById(petId)
  } catch (err) {
    throw new Error('could not find');
  }
  if (!pet){
   return  res.status(404).json({message:'no pets found'})
  }

  res.json({pet: pet}); 
});

router.post('/', async (req, res) => {
  try {
  const { Type, Name, AdoptionStatus, Picture, Height, Weight, Color, Bio, Hypoallergenic, DietaryRestrictions, Breed } = req.body
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
     Breed
  })
  await AddAPet.save();
  res.send(AddAPet);
}   catch(err) {
    next(err); 
}
})


module.exports = router;