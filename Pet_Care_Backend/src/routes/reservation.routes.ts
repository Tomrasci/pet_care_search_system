import express from 'express';
import reservationController from '../controllers/reservation.controller';

const router = express.Router();

router.get('/reservations', reservationController.getReservations);

router.get(
  '/ownerReservations/:id',
  reservationController.getOwnerReservations
);

router.get(
  '/advertisementReservations/:id',
  reservationController.getAdvertisementReservations
);

router.post('/reservations', reservationController.createReservations);

router.post(
  '/reservations/confirm/:id',
  reservationController.confirmReservation
);

router.post(
  '/reservations/cancel/:id',
  reservationController.cancelReservation
);

router.get(
  '/reservations/confirmed/:id',
  reservationController.getConfirmedAdvertisementReservations
);

export default router;
