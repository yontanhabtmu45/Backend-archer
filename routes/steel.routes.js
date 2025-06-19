const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import steel controller
const steelController = require("../controllers/steel.controller");
// Import auth middleware
const authMiddleware = require("../middlewares/auth.middlewares");

// Create a route to handle the add steel request on post
router.post(
    "/api/steel",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    steelController.createSteel
);

// Create a route to handle the get all steels request on get
router.get(
    "/api/steels",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    steelController.getAllSteels
);

// Export the router
module.exports = router;