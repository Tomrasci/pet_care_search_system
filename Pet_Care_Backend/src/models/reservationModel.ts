import database from '../../database/db';
import { IReservation } from './interfaces/IReservation';
import { IReservationWithUser } from './interfaces/IReservationWithUser';

const getReservationById = async (id: number): Promise<IReservation> => {
  return await database('reservation').where({ id }).first().select();
};

const getReservations = async (): Promise<IReservation[]> => {
  return await database('reservation').select();
};

const getAdvertisementReservations = async (
  id: number
): Promise<IReservation[]> => {
  return await database('reservation')
    .where({
      advertisement_id: id
    })
    .select();
};

const getAdvertisementReservationsWithUser = async (
  id: number
): Promise<IReservationWithUser[]> => {
  try {
    return await database('reservation')
      .where({
        advertisement_id: id
      })
      .join(`user`, `reservation.user_id`, `user.id`)
      .select(
        `reservation.id`,
        `reservation.date`,
        `reservation.time_intervals`,
        `reservation.user_id`,
        `reservation.advertisement_id`,
        `reservation.status`,
        `reservation.description`,
        `reservation.created_at`,
        `user.email as user_email`
      );
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnerReservations = async (id: number): Promise<IReservation[]> => {
  return await database('reservation')
    .where({
      user_id: id
    })
    .select();
};

const getConfirmedAdvertisementReservations = async (
  id: number
): Promise<IReservation[]> => {
  return await database('reservation')
    .where({ status: 'confirmed', advertisement_id: id })
    .select();
};

const insertReservation = async (reservation: IReservation) => {
  return await database('reservation').insert(reservation);
};

const deleteAdvertisementReservations = async (id: number) => {
  return await database('reservation').where({ advertisement_id: id }).del();
};

const deleteOwnerAdvertisementReservations = async (
  id: number,
  uid: number
) => {
  try {
    return await database('reservation')
      .where({ advertisement_id: id, user_id: uid })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

const confirmReservation = async (id: number) => {
  return await database('reservation')
    .where({ id: id })
    .update('status', 'confirmed');
};

const cancelReservation = async (id: number) => {
  return await database('reservation')
    .where({ id: id })
    .update('status', 'cancelled');
};

export default {
  getReservationById,
  getReservations,
  getOwnerReservations,
  getAdvertisementReservations,
  insertReservation,
  deleteAdvertisementReservations,
  deleteOwnerAdvertisementReservations,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations,
  getAdvertisementReservationsWithUser
};
