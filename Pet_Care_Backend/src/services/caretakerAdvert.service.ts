import caretakerAdvertModel from '../models/caretakerAdvert.model';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from '../models/interfaces/ICaretakerAdvert';

const createCaretakerAdvert = async (cAdvert: ICaretakerAdvertCreate) => {
  return await caretakerAdvertModel.createCaretakerAdvert(cAdvert);
};

const getCareTakerAdvertById = async (id: number) => {
  return await caretakerAdvertModel.getCaretakerAdvertById(id);
};

const getUserCaretakerAdverts = async (userId: number) => {
  return await caretakerAdvertModel.getUserCaretakerAdverts(userId);
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

export default {
  createCaretakerAdvert,
  getCareTakerAdvertById,
  getCareTakersAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert,
  getUserCaretakerAdverts
};
