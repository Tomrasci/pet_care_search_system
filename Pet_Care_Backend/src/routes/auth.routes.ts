import express from 'express';
import userController from '../controllers/user.controller';
import authJwt from '../middleware/authJwt';
const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get(
  '/getUserDetails',
  authJwt.verifyToken,
  userController.getUserDetails
);

router.put('/updateProfile', authJwt.verifyToken, userController.updateUser);

module.exports = router;
