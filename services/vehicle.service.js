// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the uuid module
const { v4: uuidv4 } = require("uuid");

// a function to check if a vehicle exists in the database by vehicle_id
async function checkIfVehicleExistById(vehicle_id) {
    if (!vehicle_id) return false;
    const query = "SELECT * FROM vehicle_info WHERE vehicle_id = ?";
    const [rows] = await conn.query(query, [vehicle_id]);
    return rows.length > 0;
}

// Check if a vehicle already exists by a unique field
async function checkIfVehicleExistBySerial(vehicle_serial) {
  //   if (!vehicle_serial) return false;
  const query = "SELECT * FROM vehicle_info WHERE vehicle_serial = ?";
  const rows = await conn.query(query, [vehicle_serial]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// a function to create a new vehicle
async function createVehicle(vehicle) {
  let createdVehicle = {};

  try {
    const vehicle_hash = uuidv4();

    // Insert the vehicle identifier data into the vehicle_identifier table
    const query =
      "INSERT INTO vehicle_identifier (vehicle_image, vehicle_hash) VALUES (?, ?)";
    const rows = await conn.query(query, [vehicle.vehicle_image, vehicle_hash]);

    // Get the vehicle_iden_id from the insert
    const vehicle_iden_id = rows.insertId;

    // Insert the vehicle data into the vehicle table
    const query2 =
      "INSERT INTO vehicle_info (vehicle_iden_id, vehicle_make, vehicle_model, vehicle_year, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, vehicle_total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      vehicle_iden_id,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_year,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle.vehicle_total_price,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    createdVehicle = {
      vehicle_iden_id,
    };

    return createdVehicle;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    // return res.status(500).json({ message: "Error creating vehicle" });
  }
}

// a function to get all vehicles
async function getAllVehicles() {
  try {
    const query = `SELECT 
      vi.vehicle_id,
      vi.vehicle_iden_id,
      vi.vehicle_year,
      vi.vehicle_make,
      vi.vehicle_model,
      vi.vehicle_type,
      vi.vehicle_mileage,
      vi.vehicle_tag,
      vi.vehicle_serial,
      vi.vehicle_color,
      vi.vehicle_total_price,
      vi.vehicle_added_date,
      viden.vehicle_image
    FROM vehicle_info vi
    JOIN vehicle_identifier viden ON vi.vehicle_iden_id = viden.vehicle_iden_id`;
    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    // return res.status(500).json({ message: "Error fetching vehicles" });
  }
}

// a function to get vehicle by iden_id with all related info
async function getVehicleById(vehicle_iden_id) {
  // try {
  const query = `
      SELECT 
        vi.vehicle_id,
        vi.vehicle_iden_id,
        vi.vehicle_year,
        vi.vehicle_make,
        vi.vehicle_model,
        vi.vehicle_type,
        vi.vehicle_mileage,
        vi.vehicle_tag,
        vi.vehicle_serial,
        vi.vehicle_color,
        vi.vehicle_total_price,
        vi.vehicle_added_date,
        viden.vehicle_image
      FROM vehicle_info vi
      INNER JOIN vehicle_identifier viden ON vi.vehicle_iden_id = viden.vehicle_iden_id
      WHERE vi.vehicle_iden_id = ?
    `;
  const rows = await conn.query(query, [vehicle_iden_id]);
  return rows[0] || null;
}

// a function to update vehicle by id
async function updateVehicleById(id, vehicle) {
  const query =
    "UPDATE vehicle_info SET vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ?, vehicle_total_price = ? WHERE vehicle_iden_id = ?";
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
    id,
  ]);

  const query2 =
    "UPDATE vehicle_identifier SET vehicle_image = ? WHERE vehicle_iden_id = ?";
  const rows2 = await conn.query(query2, [vehicle.vehicle_image, id]);
  if (rows.affectedRows !== 1 || rows2.affectedRows !== 1) {
    return false;
  }
  return true;

  // return rows.affectedRows === 1;
}

// a function to delete vehicle by id
async function deleteVehicleById(id) {
  const query = "DELETE FROM vehicle_identifier WHERE vehicle_iden_id = ?";
  const rows = await conn.query(query, [id]);
  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}

// Export the functions
module.exports = {
  //   checkIfVehicleExistById,
  checkIfVehicleExistBySerial,
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
};
