import express from 'express';
import caretakerAdvertController from '../controllers/caretakerAdvert.controller';

const router = express.Router();

router.post(
  '/caretakerAdverts',
  caretakerAdvertController.createCaretakerAdvertisement
);

export default router;
