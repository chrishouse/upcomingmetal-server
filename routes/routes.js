const express = require("express");
const router = express.Router();
const controller = require("../controllers/db-controllers.js");

// Get upcoming releases data
router.get("/upcoming/", controller.upcoming);

// Get recent releases data
router.get("/recent/", controller.recent);

// Refresh DB
router.get("/refresh/", controller.refreshDB);

module.exports = router;