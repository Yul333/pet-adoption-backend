const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
	Type: String,
	Name: String,
    AdoptionStatus: String,
	Picture: String,
    Height: Number,
    Weight: Number,
    Color: String,
    Bio: String,
    Hypoallergenic: String,
    DietaryRestrictions: String,
    Breed: String,
});

module.exports = mongoose.model("Pet", schema);