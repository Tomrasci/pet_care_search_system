import database from '../../database/db';
import { IReservation } from './interfaces/IReservation';

const getReservationById = async (id: number): Promise<IReservation> => {
  try {
    return await database('reservation').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getReservations = async (): Promise<IReservation[]> => {
  try {
    return await database('reservation').select();
  } catch (err) {
    console.log(err.message);
  }
};

const getAdvertisementReservations = async (
  id: number
): Promise<IReservation[]> => {
  try {
    return await database('reservation')
      .where({
        advertisement_id: id
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnerReservations = async (id: number): Promise<IReservation[]> => {
  try {
    return await database('reservation')
      .where({
        user_id: id
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertReservations = async (reservationArray: IReservation[]) => {
  try {
    return await database('reservation').insert(reservationArray);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteAdvertisementReservations = async (id: number) => {
  try {
    return await database('reservation').where({ advertisement_id: id }).del();
  } catch (err) {
    console.log(err.message);
  }
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
export default {
  getReservationById,
  getReservations,
  getOwnerReservations,
  getAdvertisementReservations,
  insertReservations,
  deleteAdvertisementReservations,
  deleteOwnerAdvertisementReservations
};
