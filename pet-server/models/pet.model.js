const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
	name: String,
	type: String,
    status: String,
	mediaUrl: String,
});

module.exports = mongoose.model("Pet", schema);