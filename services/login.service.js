// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison 
const bcrypt = require('bcrypt');
// Import the admin service to get admin by email  
const adminService = require("./admin.service");
// Handle admin login 
async function logIn(adminData) {
  try {
    let returnData = {}; // Object to be returned
    const admin = await adminService.getAdminByEmail(adminData.admin_email);
    if (admin.length === 0) {
      returnData = {
        status: "fail",
        message: "admin does not exist"
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(adminData.admin_password, admin[0].admin_password_hashed);
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password"
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: admin[0]
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// Export the function 
module.exports = {
  logIn
};