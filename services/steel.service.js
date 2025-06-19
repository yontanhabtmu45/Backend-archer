// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the uuid module
const { v4: uuidv4 } = require("uuid");

// a function to check if steel exists in the database
async function checkIfSteelExist(id) {
    const query = "SELECT * FROM steel WHERE steel_id = ?";
    const rows = await conn.query(query, [id]);
    if (rows.length > 0) {
        return true;
    }
    return false;
}

// a function to create a new steel
async function createSteel(steel) {
    let createdSteel = {};

    try {
        const steel_id = uuidv4();

        // Insert the steel data into the steel table
        const query = "INSERT INTO steel (steel_id, steel_type, steel_grade, steel_weight, steel_price) VALUES (?, ?, ?, ?, ?)";
        const rows = await conn.query(query, [
            steel_id,
            steel.steel_type,
            steel.steel_grade,
            steel.steel_weight,
            steel.steel_price
        ]);

        if (rows.affectedRows !== 1) {
            return res.status(400).json({
                status: false,
            });
        }

        createdSteel = {
            steel_id: steel_id,
        };

        return createdSteel;
    } catch (error) {
        console.error("Error creating steel:", error);
        return res.status(500).json({
            status: false,
        });
    }
}

// a function to get all steels
async function getAllSteels() {
    const query = "SELECT * FROM steel";
    const rows = await conn.query(query);
    if (rows.length > 0) {
        return rows;
    }
    return false;
}

// a function to get a steel by id
async function getSteelById(id) {
    const query = "SELECT * FROM steel WHERE steel_id = ?";
    const rows = await conn.query(query, [id]);
    if (rows.length > 0) {
        return rows[0];
    }
    return false;
}

// a function to update a steel
async function updateSteel(id, steel) {
    const query = "UPDATE steel SET steel_type = ?, steel_grade = ?, steel_weight = ?, steel_price = ? WHERE steel_id = ?";
    const rows = await conn.query(query, [
        steel.steel_type,
        steel.steel_grade,
        steel.steel_weight,
        steel.steel_price,
        id
    ]);

    const query2 = "UPDATE steel_identifier SET steel_image = ?, steel_hash = ? WHERE steel_id = ?";
    const rows2 = await conn.query(query2, [
        steel.steel_image,
        steel.steel_hash,
        id
    ]);

    if (rows.affectedRows !== 1 || rows2.affectedRows !== 1) {
        return false;
    }

    if (rows.affectedRows === 1) {
        return true;
    }
    return false;
}

// a function to delete a steel
async function deleteSteel(id) {
    const query = "DELETE FROM steel WHERE steel_id = ?";
    const rows = await conn.query(query, [id]);

    if (rows.affectedRows === 1) {
        return true;
    }
    return false;
}

// Export the functions
module.exports = {
    checkIfSteelExist,
    createSteel,
    getAllSteels,
    getSteelById,
    updateSteel,
    deleteSteel
}