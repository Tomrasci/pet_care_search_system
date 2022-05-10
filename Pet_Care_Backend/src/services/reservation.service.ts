import reservationModel from '../models/reservationModel';
import { IReservation } from '../models/interfaces/IReservation';
import moment from 'moment';

const nodemailer = require('nodemailer');

const createReservation = async (reservation: IReservation) => {
  return await reservationModel.insertReservation(reservation);
};

const getReservationById = async (id: number) => {
  return await reservationModel.getReservationById(id);
};

const getOwnerReservations = async (userId: number) => {
  return await reservationModel.getOwnerReservations(userId);
};

const getAdvertisementReservations = async (adId: number) => {
  return await reservationModel.getAdvertisementReservations(adId);
};

const getAdvertisementReservationsWithUser = async (adId: number) => {
  return await reservationModel.getAdvertisementReservationsWithUser(adId);
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

const insertReservation = async (reservation: IReservation) => {
  return await reservationModel.insertReservation(reservation);
};

const confirmReservation = async (id: number) => {
  return await reservationModel.confirmReservation(id);
};

const cancelReservation = async (id: number) => {
  return await reservationModel.cancelReservation(id);
};

const getConfirmedAdvertisementReservations = async (id: number) => {
  return await reservationModel.getConfirmedAdvertisementReservations(id);
};

const sendEmailAboutReservation = async (
  status: string,
  reservationTime: string,
  recipientEmail: string,
  reservationDate: Date,
  reservationDescription: string
) => {
  const senderEmail = 'petcaresearchsystem@gmail.com';
  const message =
    `Your reservation for` +
    '\n' +
    `${moment(reservationDate).format(`YYYY-MM-DD`)}` +
    '\n' +
    `${reservationTime}` +
    '\n' +
    `${reservationDescription}` +
    '\n' +
    `status is ${status}`;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: senderEmail,
      pass: process.env.SYSTEM_EMAIL_PASS
    }
  });
  const mailOptons = {
    from: senderEmail,
    to: recipientEmail,
    subject: `Reservation status update`,
    text: message
  };
  transporter.sendMail(mailOptons);
};

export default {
  createReservation,
  getReservationById,
  getReservations,
  getOwnerReservations,
  getAdvertisementReservations,
  deleteAdvertisementReservations,
  deleteOwnerAdvertisementReservations,
  insertReservation,
  confirmReservation,
  cancelReservation,
  getConfirmedAdvertisementReservations,
  sendEmailAboutReservation,
  getAdvertisementReservationsWithUser
};
