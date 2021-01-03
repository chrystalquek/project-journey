import express from 'express';
import imageController from '../controllers/image';
import { validate } from '../helpers/validation';
import multer from 'multer'

const router = express.Router();


const storage = multer.diskStorage({
  // where you want to store the file; creates the dir
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true) // will keep the file
  } else {
    cb(new Error('Image must be JPEG/PNG'), false) // will ignore the file
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post(
  '/upload',
  upload.single('image'),
  imageController.uploadImage,
);
router.post(
  '/delete',
  imageController.deleteImage,
);

export default router;
