import express from 'express';
import serviceTypeController from '../controllers/serviceType.controller';

const router = express.Router();

router.get('/serviceTypes', serviceTypeController.getServiceTypes);

router.get('/serviceTypes/:id', serviceTypeController.getServiceType);

router.get('/caretakerServices', serviceTypeController.getCaretakerServices);

router.post(
  '/caretakerServices',
  serviceTypeController.insertCaretakerServices
);

export default router;
