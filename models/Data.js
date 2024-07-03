const mongoose = require("mongoose");

const ReleaseSchema = {
	band: String,
	album: String,
	type: String,
	genre: String,
	date: String
};

exports.UpcomingData = mongoose.model("Upcomingrelease", ReleaseSchema);
exports.RecentData = mongoose.model("Recentrelease", ReleaseSchema);
