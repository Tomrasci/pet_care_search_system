import caretakerAdvertModel from '../models/caretakerAdvert.model';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from '../models/interfaces/ICaretakerAdvert';
import { ICaretakerAvailability } from '../models/interfaces/ICaretakerAvailability';
import reservationModel from '../models/reservationModel';
import moment from 'moment';
import { IReservation } from '../models/interfaces/IReservation';

const createCaretakerAdvert = async (cAdvert: ICaretakerAdvertCreate) => {
  return await caretakerAdvertModel.createCaretakerAdvert(cAdvert);
};

const getCareTakerAdvertById = async (id: number) => {
  return await caretakerAdvertModel.getCaretakerAdvertById(id);
};

const getUserCaretakerAdvert = async (userId: number) => {
  return await caretakerAdvertModel.getUserCaretakerAdvert(userId);
};

const getCareTakersAdverts = async () => {
  return await caretakerAdvertModel.getCaretakerAdverts();
};

const updateCareTakerAdvert = async (
  cAdvert: ICaretakerAdvertCreate,
  id: number
) => {
  return await caretakerAdvertModel.updateCareTakerAdvert(cAdvert, id);
};
const checkDatesAndTimesWhenUpdating = async (
  cAdvert: ICaretakerAdvertCreate,
  id: number
) => {
  let overlap = false;
  const advertisementReservations =
    await reservationModel.getConfirmedAdvertisementReservations(id);
  const filteredReservations = advertisementReservations.filter(
    (reservation) => {
      return (
        moment(reservation.date).format('L') >= moment(new Date()).format('L')
      );
    }
  );
  const start = cAdvert.startDate;
  const end = cAdvert.endDate;
  const areThereReservationsInThoseDates = (reservation: IReservation) => {
    return (
      moment(reservation.date).format('L') < moment(start).format('L') ||
      moment(reservation.date).format('L') > moment(end).format('L')
    );
  };
  if (filteredReservations.some(areThereReservationsInThoseDates)) {
    overlap = true;
  }
  return overlap;
};
const deleteCareTakerAdvert = async (id: number): Promise<ICaretakerAdvert> => {
  return await caretakerAdvertModel.deleteCareTakerAdvert(id);
};

const getCaretakerLAvailability = async (aid: number) => {
  return await caretakerAdvertModel.getCaretakerAvailability(aid);
};

const insertCaretakerAvailability = async (
  availabilityArray: ICaretakerAvailability[]
) => {
  return await caretakerAdvertModel.insertCaretakerAvailability(
    availabilityArray
  );
};

const deleteCaretakerAvailability = async (id: number) => {
  return await caretakerAdvertModel.deleteCaretakerAvailability(id);
};

const uploadCaretakerImage = async (cid: number, imageLink: string) => {
  return await caretakerAdvertModel.uploadCaretakerAdvertImage(cid, imageLink);
};

const addAdvertisementCount = async (id: number) => {
  return await caretakerAdvertModel.addAdvertisementCount(id);
};
const removeAdvertisementCount = async (id: number) => {
  return await caretakerAdvertModel.removeAdvertisementCount(id);
};
export default {
  createCaretakerAdvert,
  getCareTakerAdvertById,
  getCareTakersAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert,
  getUserCaretakerAdvert,
  getCaretakerLAvailability,
  insertCaretakerAvailability,
  deleteCaretakerAvailability,
  uploadCaretakerImage,
  addAdvertisementCount,
  removeAdvertisementCount,
  checkDatesAndTimesWhenUpdating
};
