import multer from "multer";
import fs from "fs";
import path from "path";

const dir = "uploads";

if (!fs.existsSync(dir)) {
  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".png", ".pdf", ".jpg"];
  const fileExt = path.extname(file.originalname).toLowerCase();
  console.log(fileExt);
  if (allowedFileTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Allowed file types are .png, .pdf, .jpg"),
      false
    );
  }
};

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});
export default upload;
