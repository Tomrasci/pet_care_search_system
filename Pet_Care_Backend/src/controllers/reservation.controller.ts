import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';
import reservationService from '../services/reservation.service';
import fixReservationTimes from '../utils/fixReservationTimes';
import { IGotReservation } from '../models/interfaces/IGotReservation';
import userService from '../services/user.service';

const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservation = await reservationService.getReservationById(
    Number(req.params.id)
  );

  return res.status(ResponseCodes.OK).json(reservation);
};

const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservations = await reservationService.getReservations();

  return res.status(ResponseCodes.OK).json(reservations);
};

const getConfirmedAdvertisementReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservations =
    await reservationService.getConfirmedAdvertisementReservations(
      Number(req.params.id)
    );

  return res.status(ResponseCodes.OK).json(reservations);
};

const getOwnerReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerReservations = await reservationService.getOwnerReservations(
    Number(req.params.id)
  );

  return res.status(ResponseCodes.OK).json(ownerReservations);
};

const getAdvertisementReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertReservations =
    await reservationService.getAdvertisementReservations(
      Number(req.params.id)
    );

  return res.status(ResponseCodes.OK).json(advertReservations);
};

const createReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservations: IGotReservation[] = req.body.reservations;
  const fixedReservations = fixReservationTimes(reservations);

  try {
    await reservationService.insertReservations(fixedReservations);
    logger.info(
      `Reservations have been inserted ${JSON.stringify(fixedReservations)}`
    );
    const user = await userService.getUserById(reservations[0].user_id);
    for (const reservation of reservations) {
      await reservationService.sendEmailAboutReservation(
        'pending',
        reservation.timeInterval,
        user.email
      );
    }
    logger.info(
      `Reservation messages have been sent to the user ${JSON.stringify(
        user.name
      )}`
    );
  } catch (err) {
    console.log(err);
  }
  return res.status(ResponseCodes.CREATED).json(fixReservationTimes);
};

const deleteReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await reservationService.deleteOwnerAdvertisementReservations(
      req.body.userId,
      req.body.ownerId
    );
  } catch (err) {
    logger.error(err.message);
  }
  return res.status(ResponseCodes.OK).json('Reservations deleted sucessfully');
};

const confirmReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await reservationService.confirmReservation(Number(req.params.id));
  } catch (err) {
    logger.error(err.message);
  }
  return res.status(ResponseCodes.OK).json('Reservation confirmed sucessfully');
};

const cancelReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await reservationService.cancelReservation(Number(req.params.id));
  } catch (err) {
    logger.error(err.message);
  }
  return res.status(ResponseCodes.OK).json('Reservation cancelled sucessfully');
};

export default {
  getOwnerReservations,
  getAdvertisementReservations,
  getReservationById,
  getReservations,
  createReservations,
  deleteReservations,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations
};
