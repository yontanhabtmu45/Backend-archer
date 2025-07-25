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
    steelController.createSteel
);

// Create a route to handle the get all steels request on get
router.get(
    "/api/steels",
    steelController.getAllSteels
);

// Get steel by ID
router.get(
    "/api/steel/:id",
    steelController.getSteelById
  );
  
  // Update steel by ID
  router.put(
    "/api/steel/:id",
    steelController.updateSteelById
  );
  
  // Delete steel by ID
  router.delete(
    "/api/steel/:id",
    steelController.deleteSteelById
  );

// Export the router
module.exports = router;