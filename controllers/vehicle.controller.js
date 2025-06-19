// Import vehicle service
const vehicleService = require("../services/vehicle.service");
// Create the add vehicle controller
async function createVehicle(req, res, next) {
    // check if vehicle already exists in the database
    const vehicleExists = await vehicleService.checkIfVehicleExist(
        req.body.vehicle_id
    );

    // If vehicle exists, send a response to the client
    if (vehicleExists) {
        res.status(400).json({
            error: "This vehicle already exists in the database!"
        });
    } else {
        try {
            const vehicleData = req.body;
            // Create the vehicle
            const vehicle = await vehicleService.createVehicle(vehicleData);
            if (!vehicle) {
                res.status(400).json({
                    error: "Failed to add the vehicle!"
                });
            } else {
                res.status(200).json({
                    status: "true"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: "Something went wrong!"
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


// Export module
module.exports = {
    createVehicle,
    getAllVehicles,
};