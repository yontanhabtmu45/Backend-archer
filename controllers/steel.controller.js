// Import steel service
const steelService = "../services/steel.service";
// create the added steel controller
async function createSteel(req, res, next) {
  // check if the steel already exists in the database
  const steelExists = await steelService.checkIfSteelExist(req.body.steel_id);

  // If steel exists, send a response to the client
  if (steelExists) {
    res.status(400).json({
      error: "This steel already exists in the database!",
    });
  } else {
    try {
      const steelData = req.body;
      // Create the steel
      const steel = await steelService.createSteel(steelData);
      if (!steel) {
        res.status(400).json({
          error: "Failed to add the steel!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// create the get all steels controller
async function getAllSteels(req, res, next) {
  const steels = await steelService.getAllSteels();
  if (!steels) {
    res.status(404).json({
      error: "No steels found!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: steels,
    });
  }
}

module.exports = {
    createSteel,
    getAllSteels
}