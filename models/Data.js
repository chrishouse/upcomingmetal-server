const mongoose = require("mongoose");

const ReleaseSchema = {
	band: String,
	album: String,
	type: String,
	genre: String,
	date: String
};

module.exports = mongoose.model("Release", ReleaseSchema);
