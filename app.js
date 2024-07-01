const path = require("path");

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200
};

const routes = require("./routes/routes");

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

app.use("/api/releases", routes);

// Connect Database
connectDB();

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Prevent Heroku app from sleeping
const http = require('http');

setInterval(() => {
  http.get("https://upcomingmetal-prd-6275f039f0a0.herokuapp.com/api/releases/upcoming?genre=all&type=all");
}, 25 * 60 * 1000); // every 25 minutes