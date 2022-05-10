import express from 'express';
import ownerAdvertController from '../controllers/ownerAdvert.controller';
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
  `/uploadOwnerImage/:id`,
  upload.single(`file`),
  ownerAdvertController.uploadOwnerPhoto
);

router.post(
  '/ownerAdverts',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.createOwnerAdvertisement
);

router.get('/ownerAdverts', ownerAdvertController.getOwnerAdverts);

router.get('/ownerAdverts/:id', ownerAdvertController.getOwnerAdvert);

router.get(
  '/myOwnerAdvert/:userId',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.getUserOwnerAdvert
);

router.put(
  '/ownerAdverts/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.updateOwnerAdvert
);

router.delete(
  '/ownerAdverts/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.deleteOwnerAdvert
);

router.get(
  '/ownerPets/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.getOwnerPets
);

router.get(
  '/ownerServices/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.getOwnerServices
);

router.get(
  '/ownerLanguages/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  ownerAdvertController.getOwnerLanguages
);

export default router;
