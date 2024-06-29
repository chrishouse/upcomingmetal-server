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

const port = 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));