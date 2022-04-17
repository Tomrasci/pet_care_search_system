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

router.get(
  '/myAdverts/:userId',
  caretakerAdvertController.getUserCaretakerAdverts
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
