// Importing multer for file uploading.
import multer from "multer";
import fs from "fs";
import path from "path";

// Setting up the directory for file uploads.
const dir = "uploads";

// Creating the directory if not found.
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configuring multer disk storage for file handling.
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Configuring file filter based on allowed file types.
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".png", ".pdf", ".jpg"];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  // Checking if the file extension is allowed.
  if (allowedFileTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Allowed file types are .png, .pdf, .jpg"),
      false
    );
  }
};

// Configuring multer with the defined storage and file filter.
const upload = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

// Exporting the configured multer instance.
export default upload;
