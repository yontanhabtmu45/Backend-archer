// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the uuid module
const { v4: uuidv4 } = require("uuid");

// a function to check if a steel already exists by steel_hash
async function checkIfSteelExistByHash(steel_hash) {
    // if (!steel_hash) return false;
    const query = "SELECT * FROM steel_identifier WHERE steel_hash = ?";
    const rows = await conn.query(query, [steel_hash]);
    if (rows.length > 0) {
        return true;
      }
      return false;
}

// a function to create a new steel
async function createSteel(steel) {
  let createdSteel = {};

  try {
    const steel_hash = uuidv4();

    const query =
      "INSERT INTO steel_identifier (steel_image, steel_hash) VALUES (?, ?)";
    const rows = await conn.query(query, [steel.steel_image, steel_hash]);
    // Get the steel iden id from the insert
    const steel_iden_id = rows.insertId;

    // Insert the steel data into the steel table
    const query2 =
      "INSERT INTO steel_info (steel_iden_id, steel_type, steel_weight, steel_price_per_ton, steel_total_price) VALUES (?, ?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      steel_iden_id,
      steel.steel_type,
      steel.steel_weight,
      steel.steel_price_per_ton,
      steel.steel_total_price,
    ]);

    if (rows.affectedRows !== 1) {
        return false;
      }

    createdSteel = {
      steel_iden_id
    };

    return createdSteel;
  } catch (error) {
    console.error("Error creating steel:", error);
    // return res.status(500).json({
    //     status: false,
    // });
  }
}

// a function to get all steels
async function getAllSteels() {
  const query = "SELECT * FROM steel_info";
  const rows = await conn.query(query);
  return rows;

}

// a function to get a steel by id
async function getSteelById(id) {
  const query = "SELECT * FROM steel_info WHERE steel_id = ?";
  const rows = await conn.query(query, [id]);
  if (rows.length > 0) {
    return rows[0];
  }
  return false;
}

// a function to update a steel
async function updateSteelById(id, steel) {
  const query =
    "UPDATE steel_info SET steel_type = ?,  steel_weight = ?, steel_price_per_ton, steel_total_price WHERE steel_iden_id = ?";
  const rows = await conn.query(query, [
    steel.steel_type,
    steel.steel_weight,
    steel.steel_price_per_ton,
    steel.steel_total_price,
    id,
  ]);

  const query2 =
    "UPDATE steel_identifier SET steel_image = ? WHERE steel_iden_id = ?";
  const rows2 = await conn.query(query2, [
    steel.steel_image,
    id,
  ]);

  if (rows.affectedRows !== 1 || rows2.affectedRows !== 1) {
    return false;
  }
  // If both updates were successful, return true
  console.log("Steel updated successfully");
  return true
}

// a function to delete a steel
async function deleteSteel(id) {
  const query = "DELETE FROM steel_info WHERE steel_id = ?";
  const rows = await conn.query(query, [id]);

  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}

// Export the functions
module.exports = {
  checkIfSteelExistByHash,
  createSteel,
  getAllSteels,
  getSteelById,
  updateSteelById,
  deleteSteel,
};
