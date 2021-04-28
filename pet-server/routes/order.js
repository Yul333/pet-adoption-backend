
// import pets from '../data/pets.json'
// import Pet from '../../models/Pet'
// import connectDB from '../../utils/connectDB'
const express = require('express');
const { addBonny } = require('../data/connectDb');
const router = express.Router();
const ordersData = require('../data/pets');


router.get('/', async (req, res, next) => {
  console.log("ma")
    try {

      const addedPet = await addBonny();
      res.status(200).json(addedPet);
    } catch(err) {
      next(err); 
    }
});


router.get('/:id', async (req, res, next) => {
  console.log("ma")
    try {

      const addedPet = await addBonny();
      res.status(200).json(addedPet);
    } catch(err) {
      next(err); 
    }
});

router.post('/', async (req, res, next) => {
  console.log("ma")
    try {

      const addedPet = await addBonny();
      res.status(200).json(addedPet);
    } catch(err) {
      next(err); 
    }
});

router.delete('/:id', async (req, res, next) => {
  console.log("ma")
    try {

      const addedPet = await addBonny();
      res.status(200).json(addedPet);
    } catch(err) {
      next(err); 
    }
});

module.exports = router;