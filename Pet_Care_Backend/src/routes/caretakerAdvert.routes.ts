import express from 'express';
import caretakerAdvertController from '../controllers/caretakerAdvert.controller';

const router = express.Router();

router.post(
  '/caretakerAdverts',
  caretakerAdvertController.createCaretakerAdvertisement
);

router.get('/caretakerAdverts', caretakerAdvertController.getCareTakerAdverts);

router.get(
  '/caretakerAdverts/:id',
  caretakerAdvertController.getCareTakerAdvert
);

router.put(
  '/caretakerAdverts/:id',
  caretakerAdvertController.updateCareTakerAdvert
);

router.delete(
  '/caretakerAdverts/:id',
  caretakerAdvertController.deleteCareTakerAdvert
);

export default router;
