// Load Data model
const Data = require("../models/Data");
const getMetal = require("../get-metal");

const upcoming = (req, res) => {
  let options = {};
  if (req.query.genre !== "all") {
    options.genre = { "$regex": req.query.genre, "$options": "i" };
  }
  if (req.query.type !== "all") {
    options.type = { "$regex": req.query.type, "$options": "i" };
  }
	Data.find(options)
		.then((data) => {
			if (!data) {
				return res.status(404).json({ error: "No items found" });
			}
			res.json(data);
		})
		.catch(() => res.status(404).json({ error: "No items found" }));
};

const refreshDB = (req, res) => {
  if (req.query.password === "zElda(090") {
    getMetal();
    res.json({ message: "The DB has been refreshed" });
  } else {
    res.json({ message: "Not authorized" });
  }
};

exports.upcoming = upcoming;
exports.refreshDB = refreshDB;