const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 🔥 dynamic folder
    if (file.fieldname === "profileImage") {
      cb(null, "images/profile");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "images/courses");
    } else {
      cb(new Error("Invalid upload field"), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
