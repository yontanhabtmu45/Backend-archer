// Import the query function from the db.config.js file
require('dotenv').config();
const conn = require("./config/db.config");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sanitize = require("sanitize");
const router = require("./routes");
const app = express();

const corsOptions = { origin: "*", optionsSuccessStatus: 200 };
const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'))
app.use(sanitize.middleware);
app.use(router);
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now()  + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Image upload endpoint (for vehicles and steels)
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return the relative path to save in DB
  res.json({ imagePath: `${req.file.filename}` });
  // const image = req.file.filename;
  // const sql = "UPDATE vehicle_identifier SET vehicle_image = ?"
  // conn.query(sql, [image], (err, result) => {
  //   if (err) return res.status(400).json({ error: 'No file uploaded' });
  //   return res.json({ Status: "success" });

  // })
  console.log(req.file);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
// Export the webserver for use in the application
module.exports = app;
