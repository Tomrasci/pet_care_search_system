import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';
import reservationService from '../services/reservation.service';

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

const getOwnerReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerReservations = await reservationService.getUserReservations(
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
  const reservations = req.body.reservations;

  try {
    await reservationService.insertReservations(reservations);
    logger.info(
      `Reservations have been inserted ${JSON.stringify(reservations)}`
    );
  } catch (err) {
    console.log(err);
  }
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

export default {
  getOwnerReservations,
  getAdvertisementReservations,
  getReservationById,
  getReservations,
  createReservations,
  deleteReservations
};
