const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload-audio", upload.single("audio"), (req, res) => {
  if (req.file) {
    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
    });
  } else {
    res.status(400).send("No file uploaded");
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
