// Import steel service
const steelService = require("../services/steel.service");
// create the added steel controller
async function createSteel(req, res, next) {
  const steel_hash = req.body;
  // check if the steel already exists in the database
  const steelExists = await steelService.checkIfSteelExistByHash(steel_hash);

  // If steel exists, send a response to the client
  if (steelExists) {
    res.status(400).json({
      error: "This vehicle already exists in the database!",
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
          status: "success",
          data: steel,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Server error while adding steel.",
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

// Get steel by ID
async function getSteelById(req, res, next) {
  const { id } = req.params;
  try {
    const steel = await steelService.getSteelById(id);
    if (!steel) {
      return res
        .status(404)
        .json({ status: "fail", message: "Steel not found" });
    }
    res.status(200).json({ status: "success", data: steel });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
}

// Update steel by ID
async function updateSteelById(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedSteel = await steelService.updateSteelById(id, updateData);
    if (!updatedSteel) {
      return res
        .status(404)
        .json({ status: "fail", message: "Steel not found or not updated" });
    }
    return res.status(200).json({ message: "Steel updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
}

// Delete steel by ID
async function deleteSteelById(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await steelService.deleteSteelById(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: "fail", message: "Steel not found or not deleted" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Steel deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error" });
  }
}

module.exports = {
  createSteel,
  getAllSteels,
  getSteelById,
  updateSteelById,
  deleteSteelById,
};
