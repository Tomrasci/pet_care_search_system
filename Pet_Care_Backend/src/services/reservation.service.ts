import reservationModel from '../models/reservationModel';
import { IReservation } from '../models/interfaces/IReservation';

const createReservation = async (reservationArray: IReservation[]) => {
  return await reservationModel.insertReservations(reservationArray);
};

const getReservationById = async (id: number) => {
  return await reservationModel.getReservationById(id);
};

const getUserReservations = async (userId: number) => {
  return await reservationModel.getOwnerReservations(userId);
};

const getAdvertisementReservations = async (adId: number) => {
  return await reservationModel.getAdvertisementReservations(adId);
};

const getReservations = async () => {
  return await reservationModel.getReservations();
};

const deleteOwnerAdvertisementReservations = async (
  uid: number,
  aid: number
) => {
  return await reservationModel.deleteOwnerAdvertisementReservations(aid, uid);
};

const deleteAdvertisementReservations = async (aid: number) => {
  return await reservationModel.deleteAdvertisementReservations(aid);
};

const insertReservations = async (reservationArray: IReservation[]) => {
  return await reservationModel.insertReservations(reservationArray);
};

const confirmReservation = async (id: number) => {
  return await reservationModel.confirmReservation(id);
};

const cancelReservation = async (id: number) => {
  return await reservationModel.cancelReservation(id);
};

export default {
  createReservation,
  getReservationById,
  getReservations,
  getUserReservations,
  getAdvertisementReservations,
  deleteAdvertisementReservations,
  deleteOwnerAdvertisementReservations,
  insertReservations,
  confirmReservation,
  cancelReservation
};
