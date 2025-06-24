// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the admin controller
const adminController = require("../controllers/admin.controller");
// import the auth middleware
const authMiddleware = require("../middlewares/auth.middlewares");
// Create a route to handle the add admin request on post
router.post(
  "/api/admin",
  adminController.createAdmin
);
// Create a route to handle the get all admins request on get
router.get(
  "/api/admins",
  adminController.getAllAdmins
); 

// Get admin by ID
router.get(
  "/api/admin/:id",
  adminController.getAdminById
);

// Update admin by ID
router.put(
  "/api/admin/:id", 
  adminController.updateAdminById
);

// Delete admin by ID
router.delete(
  "/api/admin/:id",
  adminController.deleteAdminById
);
// Export the router
module.exports = router;
