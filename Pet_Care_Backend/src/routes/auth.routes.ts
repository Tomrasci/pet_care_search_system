import express from 'express';
import userController from '../controllers/user.controller';
import authJwt from '../middleware/authJwt';
const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/getUserDetails', userController.getUserDetails);
router.put('/changePassword', userController.changePassword);

router.put('/updateProfile', userController.updateUser);

module.exports = router;
