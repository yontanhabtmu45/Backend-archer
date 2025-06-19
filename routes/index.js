// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.routes');
// Import the admin routes 
const adminRouter = require('./admin.routes');
// Import the vehicle routes
const vehicleRouter = require('./vehicle.routes');
// Import the steel routes
const steelRouter = require('./steel.routes');
// Import the login routes 
const loginRoutes = require("./login.routes");
// Add the install router to the main router 
router.use(installRouter);
// Add the admin routes to the main router 
router.use(adminRouter);
// Add the vehicle routes to the main router
router.use(vehicleRouter);
// Add the steel routes to the main router
router.use(steelRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Export the router
module.exports = router; 