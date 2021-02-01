import express from 'express';
import multer from 'multer';
import fs from 'fs';
import imageController from '../controllers/image';

const router = express.Router();

const imageDir = '/tmp';
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
  // where you want to store the file; creates the dir
  destination(req, file, cb) {
    cb(null, imageDir);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // will keep the file
  } else {
    cb(new Error('Image must be JPEG/PNG'), false); // will ignore the file
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get(
  '/:email',
  imageController.getImageWithEmail,
);

router.post(
  '/',
  upload.single('image'),
  imageController.uploadImage,
);

router.post(
  '/profile-picture',
  upload.single('image'),
  imageController.updateProfilePicture,
);

router.delete(
  '/:email',
  imageController.deleteImageWithEmail,
);

export default router;
