import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import logger from '../../logger';
import { IReservation } from '../models/interfaces/IReservation';
import reservationService from '../services/reservation.service';
import userService from '../services/user.service';
import isEmpty from '../utils/Empty';
import { ResponseCodes } from '../utils/responseCodes';

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
  if (!reservations || isEmpty(reservations)) {
    return next(
      ApiError.notFoundError(
        `Reservation was not found with advertisement id  ${req.params.id}`
      )
    );
  }

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

const getAdvertisementReservationsWithUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertReservations =
    await reservationService.getAdvertisementReservationsWithUser(
      Number(req.params.id)
    );

  return res.status(ResponseCodes.OK).json(advertReservations);
};

const createReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservation: IReservation = {
    advertisement_id: req.body.advertisement_id,
    date: req.body.date,
    description: req.body.description,
    status: req.body.status,
    time_intervals: req.body.timeInterval,
    user_id: req.body.user_id
  };

  await reservationService.insertReservation(reservation);
  logger.info(`Reservations have been inserted ${JSON.stringify(reservation)}`);
  const user = await userService.getUserById(reservation.user_id);

  await reservationService.sendEmailAboutReservation(
    'pending',
    reservation.time_intervals,
    user.email,
    reservation.date,
    reservation.description
  );

  logger.info(
    `Reservation messages have been sent to the user ${JSON.stringify(
      user.name
    )}`
  );

  return res.status(ResponseCodes.CREATED).json(reservation);
};

const confirmReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation: IReservation =
      await reservationService.getReservationById(Number(req.params.id));
    if (!reservation || isEmpty(reservation)) {
      return next(
        ApiError.notFoundError(
          `Reservation was not found with advertisement id  ${req.params.id}`
        )
      );
    }
    await reservationService.confirmReservation(Number(req.params.id));
    const user = await userService.getUserById(reservation.user_id);
    await reservationService.sendEmailAboutReservation(
      'confirmed',
      `${reservation.time_intervals}`,
      user.email,
      reservation.date,
      reservation.description
    );
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
    const reservation: IReservation =
      await reservationService.getReservationById(Number(req.params.id));
    if (!reservation || isEmpty(reservation)) {
      return next(
        ApiError.notFoundError(
          `Reservation was not found with advertisement id  ${req.params.id}`
        )
      );
    }
    await reservationService.cancelReservation(Number(req.params.id));
    const user = await userService.getUserById(reservation.user_id);
    await reservationService.sendEmailAboutReservation(
      'cancelled',
      `${reservation.time_intervals}`,
      user.email,
      reservation.date,
      reservation.description
    );
  } catch (err) {
    logger.error(err.message);
  }
  return res.status(ResponseCodes.OK).json('Reservation cancelled sucessfully');
};

export default {
  getOwnerReservations,
  getAdvertisementReservations,
  getReservations,
  createReservations,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations,
  getAdvertisementReservationsWithUser
};
