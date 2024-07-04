const mongoose = require("mongoose");
const getMetal = require("../get-metal");

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(
			`mongodb+srv://chrishouse83:PiNfSV1kbfUSHHkw@cluster0.1oyqr.mongodb.net/upcomingmetal_dev`
		);
		console.log("MongoDB is Connected...");

		// Run the get-metal script every 6 hours
		setTimeout(getMetal.getUpcoming, 1000 * 60 * 60 * 6);
		setTimeout(getMetal.getRecent, 1000 * 60 * 60 * 6);

	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
