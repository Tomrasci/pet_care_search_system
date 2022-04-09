import express from 'express';
import languageController from '../controllers/language.controller';
const router = express.Router();

router.get('/languages', languageController.getLanguages);

router.get('/languages/:id', languageController.getLanguage);

export default router;
