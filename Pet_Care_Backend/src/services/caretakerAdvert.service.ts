import caretakerAdvertModel from '../models/caretakerAdvert.model';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from '../models/interfaces/ICaretakerAdvert';
import { ICaretakerAvailability } from '../models/interfaces/ICaretakerAvailability';

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
  uploadCaretakerImage
};
