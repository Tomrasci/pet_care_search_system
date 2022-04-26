/* eslint-disable dot-notation */
import express from 'express';
import caretakerAdvertController from '../controllers/caretakerAdvert.controller';

const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  }
});

const upload = multer({
  storage: storage
});

router.post(
  `/uploadCaretakerImage/:id`,
  upload.single(`file`),
  caretakerAdvertController.uploadCaretakerPhoto
);

router.post(
  '/caretakerAdverts',
  caretakerAdvertController.createCaretakerAdvertisement
);

router.get('/caretakerAdverts', caretakerAdvertController.getCareTakerAdverts);

router.get(
  '/caretakerAdverts/:id',
  caretakerAdvertController.getCareTakerAdvert
);

router.get(
  '/myCaretakerAdvertisement/:userId',
  caretakerAdvertController.getUserCaretakerAdvert
);

router.put(
  '/caretakerAdverts/:id',
  caretakerAdvertController.updateCareTakerAdvert
);

router.delete(
  '/caretakerAdverts/:id',
  caretakerAdvertController.deleteCareTakerAdvert
);

router.get('/caretakerPets/:id', caretakerAdvertController.getCaretakerPets);

router.get(
  '/caretakerServices/:id',
  caretakerAdvertController.getCaretakerServices
);

router.get(
  '/caretakerLanguages/:id',
  caretakerAdvertController.getCaretakerLanguages
);

router.get(
  '/caretakerAvailability/:id',
  caretakerAdvertController.getCaretakerAvailability
);

export default router;
