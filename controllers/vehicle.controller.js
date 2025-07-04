// Import vehicle service
const vehicleService = require("../services/vehicle.service");
// Create the add vehicle controller
async function createVehicle(req, res, next) {
  // check if vehicle already exists in the database
  const vehicleExists = await vehicleService.checkIfVehicleExistBySerial(
    req.body.vehicle_serial
  );

  // If vehicle exists, send a response to the client
  if (vehicleExists) {
    res.status(400).json({
      error: "This vehicle already exists in the database!",
    });
  } else {
    try {
      const vehicleData = req.body;
      // Create the vehicle
      const vehicle = await vehicleService.createVehicle(vehicleData);
      if (!vehicle) {
        res.status(400).json({
          error: "Failed to add the vehicle!",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: vehicle,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// create the get all vehicles controller
async function getAllVehicles(req, res, next) {
  const vehicles = await vehicleService.getAllVehicles();
  if (!vehicles) {
    res.status(404).json({
      error: "No vehicles found!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: vehicles,
    });
  }
}

// Get vehicle by ID
async function getVehicleById(req, res, next) {
  const { id } = req.params;
  try {
    const vehicle = await vehicleService.getVehicleById(id);
    if (!vehicle) {
      return res.status(404).json({
        status: "fail",
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: vehicle,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
}

// Update vehicle by ID
async function updateVehicleById(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedVehicle = await vehicleService.updateVehicleById(
      id,
      updateData
    );
    if (!updatedVehicle) {
      return res.status(404).json({
        status: "fail",
        message: "Vehicle not found or not updated",
      });
    }
    return res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
}

// Delete vehicle by ID
async function deleteVehicleById(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await vehicleService.deleteVehicleById(id);
    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        message: "Vehicle not found or not deleted",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
}

// Export module
module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
};
