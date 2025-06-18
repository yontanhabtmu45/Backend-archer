// Import the admin service
const adminService = require("../services/admin.service");
// Create the add admin controller
async function createAdmin(req, res, next) {
  // Check if admin email already exists in the database
  const adminExists = await adminService.checkIfAdminExists(
    req.body.admin_email
  );
  // If admin exists, send a response to the client
  if (adminExists) {
    res.status(400).json({
      error: "This email address is already associated with another admin!",
    });
  } else {
    try {
      const adminData = req.body;
      // Create the admin
      const admin = await adminService.createAdmin(adminData);
      if (!admin) {
        res.status(400).json({
          error: "Failed to add the admin!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// create the get all admins controller
async function getAllAdmins(req, res, next) {
  const admins = await adminService.getAllAdmins();
  if (!admins) {
    res.status(404).json({
      error: "No admins found!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: admins,
    });
  }
}

// Export the createAdmin controller
module.exports = {
  createAdmin,
  getAllAdmins,
};
