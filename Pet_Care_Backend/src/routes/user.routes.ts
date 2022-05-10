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
router.put(
  '/changePassword',
  authJwt.verifyToken,
  userController.changePassword
);

router.put('/updateProfile', authJwt.verifyToken, userController.changeProfile);

router.get(
  '/getUsers',
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.getNonAdminUsers
);

router.put(
  '/updateUser',
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.updateUser
);

router.delete(
  '/deleteUser/:id',
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.deleteUser
);

module.exports = router;
