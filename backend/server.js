const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const User = require("./Model");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (file.fieldname == "image") {
        cb(null, "uploads/");
      } else if (file.fieldname == "text") {
        cb(null, "uploads/File/");
      }
    } catch (error) {
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads"));
app.post("/upload", upload.fields([{ name: "image", maxCount: 5 }, { name: "text", maxCount: 2 }]), async (req, res) => {
  try {
    const { image, text } = req.files;
    const files = [];
    if (image) {
      image.forEach((file) => {
        files.push({
          originalName: file.originalname,
          path: file.path,
        });
      });
    }

    if (text) {
      text.forEach((file) => {
        files.push({
          originalName: file.originalname,
          path: file.path,
        });
      });
    }
    const user = new User({
      files: files,
    });
    await user.save();

    res.json({ message: "Files uploaded successfully." });
  } catch (error) {
    console.error('Error uploading files:', error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/getFiles', async (req, res) => {
    try {
      const data = await User.find({});
      res.json({ data });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
const port = 3001; // Choose a port of your choice
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});