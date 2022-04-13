import express from 'express';
import petTypeController from '../controllers/petType.controller';

const router = express.Router();

router.get('/petTypes', petTypeController.getPetTypes);

router.get('/petTypes/:id', petTypeController.getPetType);

router.post('/caretakerPets', petTypeController.insertCaretakerPets);
export default router;
