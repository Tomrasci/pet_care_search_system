import express from 'express';
import reservationController from '../controllers/reservation.controller';
import authJwt from '../middleware/authJwt';

const router = express.Router();

router.get(
  '/reservations',
  authJwt.verifyToken,
  reservationController.getReservations
);

router.get(
  '/ownerReservations/:id',
  authJwt.verifyToken,
  authJwt.isOwnerOrAdmin,
  reservationController.getOwnerReservations
);

router.get(
  '/advertisementReservations/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  reservationController.getAdvertisementReservations
);
router.get(
  '/advertisementReservationsWithUser/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  reservationController.getAdvertisementReservationsWithUser
);

router.post('/reservations', reservationController.createReservations);

router.post(
  '/reservations/confirm/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  reservationController.confirmReservation
);

router.post(
  '/reservations/cancel/:id',
  authJwt.verifyToken,
  authJwt.isCaretakerOrAdmin,
  reservationController.cancelReservation
);

router.get(
  '/reservations/confirmed/:id',
  authJwt.verifyToken,
  reservationController.getConfirmedAdvertisementReservations
);

export default router;
