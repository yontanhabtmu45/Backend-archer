// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if admin exists in the database
async function checkIfAdminExists(email) {
  const query = "SELECT * FROM admin WHERE admin_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new admin
async function createAdmin(admin) {
  let createdAdmin = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(admin.admin_password, salt);
    // Insert the email in to the admin table
    const query =
      "INSERT INTO admin (admin_email) VALUES (?)";
    const rows = await conn.query(query, [
      admin.admin_email,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the admin id from the insert
    const admin_id = rows.insertId;
    // Insert the remaining data in to the admin_info, admin_pass, and admin_role tables
    const query2 =
      "INSERT INTO admin_info (admin_id, admin_user_name, admin_first_name, admin_last_name, admin_phone) VALUES (?, ?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      admin_id,
      admin.admin_user_name,
      admin.admin_first_name,
      admin.admin_last_name,
      admin.admin_phone,
    ]);
    const query3 =
      "INSERT INTO admin_pass (admin_id, admin_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [admin_id, hashedPassword]);
    const query4 =
      "INSERT INTO admin_role (admin_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      admin_id,
      admin.company_role_id,
    ]);
    // construct to the admin object to return
    createdAdmin = {
      admin_id: admin_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the admin object
  return createdAdmin;
}

// A function to get admin by email
async function getAdminByEmail(admin_email) {
  const query =
    "SELECT * FROM admin INNER JOIN admin_info ON admin.admin_id = admin_info.admin_id INNER JOIN admin_pass ON admin.admin_id = admin_pass.admin_id INNER JOIN admin_role ON admin.admin_id = admin_role.admin_id WHERE admin.admin_email = ?";
  const rows = await conn.query(query, [admin_email]);
  return rows;
}

// A function to get all admins
async function getAllAdmins() {
  const query =
    "SELECT * FROM admin INNER JOIN admin_info ON admin.admin_id = admin_info.admin_id INNER JOIN admin_role ON admin.admin_id = admin_role.admin_id INNER JOIN company_roles ON admin_role.company_role_id = company_roles.company_role_id ORDER BY admin.admin_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}

// Update admin by ID
async function updateAdminById(id, updateData) {
  // Update admin_info
  const query =
    "UPDATE admin_info SET admin_user_name = ?, admin_first_name = ?, admin_last_name = ?, admin_phone = ? WHERE admin_id = ?";
  const rows = await conn.query(query, [
    updateData.admin_user_name,
    updateData.admin_first_name,
    updateData.admin_last_name,
    updateData.admin_phone,
    id,
  ]);
  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}

// Delete admin by ID
async function deleteAdminById(id) {
  const query = "DELETE FROM admin WHERE admin_id = ?";
  const rows = await conn.query(query, [id]);

  const query2 = "DELETE FROM admin_"

  if (rows.affectedRows === 1) {
    return true;
  }
  return false;
}

// Export the functions for use in the controller
module.exports = {
  checkIfAdminExists,
  createAdmin,
  getAdminByEmail,
  getAllAdmins,
  updateAdminById,
  deleteAdminById
};
