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

// Get admin by ID
async function getAdminById(req, res, next) {
  const { id } = req.params;
  try {
    const admin = await adminService.getAdminById(id);
    if (!admin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error"
    });
  }
}

// Update admin by ID
async function updateAdminById(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedAdmin = await adminService.updateAdminById(id, updateData);
    if (!updatedAdmin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found or not updated"
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedAdmin
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error"
    });
  }
}

// Delete admin by ID
async function deleteAdminById(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await adminService.deleteAdminById(id);
    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found or not deleted"
      });
    }
    res.status(200).json({
      status: "success",
      message: "Admin deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error"
    });
  }
}

// Export the createAdmin controller
module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
