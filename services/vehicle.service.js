// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the uuid module
const { v4: uuidv4 } = require("uuid");



// a function to check if vehicle exists in the database
async function checkIfVehicleExist(id) {
    const query = "SELECT * FROM vehicle WHERE vehicle_id = ?";
    const rows = await conn.query(query, [id]);
    console.log(rows);
    if (rows.length > 0) {
        return true;
    }
    return false;
}


// a function to create a new vehicle
async function createVehicle(vehicle) {
    let createdVehicle = {};

    try {
        const vehicle_id = uuidv4();

        // Insert the vehicle data into the vehicle table
        const query = "INSERT INTO vehicle (vehicle_id, vehicle_make, vehicle_model, vehicle_year, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, vehicle_total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const rows = await conn.query(query, [
            vehicle_id,
            vehicle.vehicle_make,
            vehicle.vehicle_model,
            vehicle.vehicle_year,
            vehicle.vehicle_type,
            vehicle.vehicle_mileage,
            vehicle.vehicle_tag,
            vehicle.vehicle_serial,
            vehicle.vehicle_color,
            vehicle.vehicle_total_price
        ]);

        if (rows.affectedRows !== 1) {
            return false;
        }


        // Insert the vehicle identifier data into the vehicle_identifier table
        const query2 = "INSERT INTO vehicle_identifier (vehicle_image, vehicle_hash) VALUES (?, ?)";
        const rows2 = await conn.query(query2, [
            vehicle.vehicle_image,
            vehicle.vehicle_hash
        ]);

        createdVehicle = {
            vehicle_id: vehicle_id,
        }

        return createdVehicle;

    } catch (error) {
        console.error("Error creating vehicle:", error);
        return res.status(500).json({ message: "Error creating vehicle" });
    }
}


// a function to get all vehicles
async function getAllVehicles() {
    try {
        const query = "SELECT * FROM vehicle";
        const rows = await conn.query(query);
        return rows;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return res.status(500).json({ message: "Error fetching vehicles" });
    }
}


// a function to get vehicle by id
async function getVehicleById(vehicle_id) {
    try {
        const query = "SELECT * FROM vehicle WHERE vehicle_id = ?";
        const rows = await conn.query(query, [vehicle_id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ message: "Error fetching vehicle by ID" });
    }
}


// a function to update vehicle by id
async function updateVehicleById(vehicle_id, vehicle) {
    try {
        const query = "UPDATE vehicle SET vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ?, vehicle_total_price = ? WHERE vehicle_id = ?";
        const rows = await conn.query(query, [
            vehicle.vehicle_make,
            vehicle.vehicle_model,
            vehicle.vehicle_year,
            vehicle.vehicle_type,
            vehicle.vehicle_mileage,
            vehicle.vehicle_tag,
            vehicle.vehicle_serial,
            vehicle.vehicle_color,
            vehicle.vehicle_total_price,
            vehicle_id
        ]);
        
        const query2 = "UPDATE vehicle_identifier SET vehicle_image = ?, vehicle_hash = ? WHERE vehicle_id = ?";
        const rows2 = await conn.query(query2, [
            vehicle.vehicle_image,
            vehicle.vehicle_hash,
            vehicle_id
        ]);
        if (rows.affectedRows !== 1 || rows2.affectedRows !== 1) {
            return false;
        }
        // If both updates were successful, return true
        console.log("Vehicle updated successfully");
        return res.status(200).json({ message: "Vehicle updated successfully" });
        
        // return rows.affectedRows === 1;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return false;
    }
}


// a function to delete vehicle by id
async function deleteVehicleById(vehicle_id) {
    try {
        const query = "DELETE FROM vehicle WHERE vehicle_id = ?";
        const rows = await conn.query(query, [vehicle_id]);

        const query2 = "DELETE FROM vehicle_identifier WHERE vehicle_id = ?";
        const rows2 = await conn.query(query2, [vehicle_id]);

        if (rows.affectedRows !== 1 || rows2.affectedRows !== 1) {
            return false;
        }
        // If both deletions were successful, return true
        return res.status(200).json({ message: "Vehicle deleted successfully" });

        return true;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return res.status(500).json({ message: "Error deleting vehicle" });
    }
}



// Export the functions
module.exports = {
    checkIfVehicleExist,
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById
};