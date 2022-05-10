/* eslint-disable dot-notation */
import express from 'express';
import caretakerAdvertController from '../controllers/caretakerAdvert.controller';
import authJwt from '../middleware/authJwt';

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
  caretakerAdvertController.uploadCaretakerPhoto,
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin
);

router.post(
  '/caretakerAdverts',
  caretakerAdvertController.createCaretakerAdvertisement,
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin
);

router.get('/caretakerAdverts', caretakerAdvertController.getCareTakerAdverts);

router.get(
  '/caretakerAdverts/:id',
  authJwt.verifyToken,
  caretakerAdvertController.getCareTakerAdvert
);

router.get(
  '/myCaretakerAdvertisement/:userId',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  caretakerAdvertController.getUserCaretakerAdvert
);

router.put(
  '/caretakerAdverts/:id',
  caretakerAdvertController.updateCareTakerAdvert,
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin
);

router.delete(
  '/caretakerAdverts/:id',
  caretakerAdvertController.deleteCareTakerAdvert,
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin
);

router.get(
  '/caretakerPets/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  caretakerAdvertController.getCaretakerPets
);

router.get(
  '/caretakerServices/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  caretakerAdvertController.getCaretakerServices
);

router.get(
  '/caretakerLanguages/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  caretakerAdvertController.getCaretakerLanguages
);

router.get(
  '/caretakerAvailability/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  caretakerAdvertController.getCaretakerAvailability
);

export default router;
