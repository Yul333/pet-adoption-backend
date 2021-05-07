const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
	Type: {
        type:String,
        // required: true,
    },
	Name: {
        type:String,
        // required: true,
    },
    AdoptionStatus: {
        type:String,
        // required: true,
    },
	Picture: {
        type:String,
        // required: true,
    },
    Height: {
        type:Number,
        // required: true,
    },
    Weight: {
        type:Number,
        // required: true,
    },
    Color: {
        type:String,
        // required: true,
    },
    Bio: {
        type:String,
        // required: true,
    },
    Hypoallergenic: {
        type:String,
        // required: true,
    },
    DietaryRestrictions: {
        type:String,
        // required: true,
    },
    Breed: {
        type:String,
        // required: true,
    },
});

module.exports = mongoose.model("Pet", schema);