import multer from "multer";
import os from "os";
import fs from "fs";
import path from "path";

const UPLOAD_SPECS = {
  image: {
    maxSize: 10 * 1024 * 1024, // 10 MB
    fileTypes: ["image/jpeg", "image/png", "image/jpg"],
  },
  video: {
    maxSize: 200 * 1024 * 1024, // 200 MB
    fileTypes: ["video/mp4"],
  },
  application: {
    maxSize: 10 * 1024 * 1024, // 10 MB
    fileTypes: ["application/pdf"],
  },
};

let tempDirectoryPath: string | undefined;

// Gets the operating system's default directory path for temporary files
const getTempDirectoryPath = () => {
  if (!tempDirectoryPath) {
    tempDirectoryPath = os.tmpdir();

    // Creates the directory if it doesn't exists
    if (!fs.existsSync(tempDirectoryPath)) {
      fs.mkdirSync(tempDirectoryPath);
    }
  }
  return tempDirectoryPath;
};

const diskStorage = multer.diskStorage({
  // Specifies which folder the uploaded files should be stored
  destination: (req: Express.Request, file: Express.Multer.File, callback) => {
    callback(null, getTempDirectoryPath());
  },
  // Specifies what the file should be named inside the folder
  filename: (req, { originalname }, callback) => {
    const extname = path.extname(originalname);
    const basename = path.basename(originalname, extname);

    // Timestamp added to prevent duplicate file names
    callback(null, `${basename}-${Date.now()}${extname}`);
  },
});

// Validate files
const fileFilter =
  (allowedFileTypes: string[]) => (_, file: Express.Multer.File, callback) => {
    // Accepts the file
    if (allowedFileTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      // Rejects the file and throw an error
      callback(
        new Error(`File must be of type ${allowedFileTypes.join(", ")}`),
        false
      );
    }
  };

// Multer is used to process image uploads and make them available via req.file or req.files
export const uploadFile = (fileType: string) =>
  multer({
    storage: diskStorage, // where to store the files (temporarily)
    limits: {
      fileSize: UPLOAD_SPECS[fileType].maxSize,
    },
    fileFilter: fileFilter(UPLOAD_SPECS[fileType].fileTypes),
  });
