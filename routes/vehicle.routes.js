const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

// Create a route to handle the add vehicle request on post
router.post(
  "/api/vehicle",
  vehicleController.createVehicle
);

// Create a route to handle the get all vehicles request on get
router.get(
  "/api/vehicles",
  vehicleController.getAllVehicles
);

// Get vehicle by ID
router.get(
  "/api/vehicle/:id",
  vehicleController.getVehicleById
);

// Update vehicle by ID
router.put(
  "/api/vehicle/:id",
  vehicleController.updateVehicleById
);

// Delete vehicle by ID
router.delete(
  "/api/vehicle/:id",
  vehicleController.deleteVehicleById
);

// Export the router
module.exports = router;
