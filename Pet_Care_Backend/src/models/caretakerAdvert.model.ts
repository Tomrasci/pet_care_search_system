import database from '../../database/db';
import { ICaretakerAdvertCreate } from './interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from './interfaces/ICaretakerAdvert';
import { ICaretakerAvailability } from './interfaces/ICaretakerAvailability';
import isEmpty from '../utils/Empty';

const createCaretakerAdvert = async (cAdvert: ICaretakerAdvertCreate) => {
  return await database('caretaker_advertisement')
    .insert({
      ...cAdvert
    })
    .then((id) => {
      return database('caretaker_advertisement').where({ id }).first().select();
    });
};
const getCaretakerAdvertById = async (
  id: number
): Promise<ICaretakerAdvert> => {
  return await database('caretaker_advertisement')
    .where({ id })
    .first()
    .select();
};

const getUserCaretakerAdvert = async (
  userId: number
): Promise<ICaretakerAdvert> => {
  return await database('caretaker_advertisement')
    .where({ user_id: userId })
    .select()
    .first();
};

const getCaretakerAdverts = async (): Promise<ICaretakerAdvert[]> => {
  return await database('caretaker_advertisement').select();
};

const getCaretakerAvailability = async (
  id: number
): Promise<ICaretakerAvailability[]> => {
  return await database(`caretaker_availability`)
    .where({ advertisement_id: id })
    .select();
};

const insertCaretakerAvailability = async (
  availabilityArray: ICaretakerAvailability[]
) => {
  if (!isEmpty(availabilityArray)) {
    return await database('caretaker_availability').insert(availabilityArray);
  }
};

const deleteCaretakerAvailability = async (id: number) => {
  return await database('caretaker_availability')
    .where({ advertisement_id: id })
    .del();
};

const updateCareTakerAdvert = async (
  cAdvert: ICaretakerAdvertCreate,
  id: number
): Promise<ICaretakerAdvertCreate> => {
  return await database('caretaker_advertisement')
    .where({ id })
    .update({
      ...cAdvert,
      updated_at: database.fn.now()
    });
};

const addAdvertisementCount = async (id: number) => {
  return await database('user').where({ id }).update({
    advert_count: 1
  });
};
const removeAdvertisementCount = async (id: number) => {
  return await database('user').where({ id }).update({
    advert_count: 0
  });
};

const deleteCareTakerAdvert = async (id: number): Promise<ICaretakerAdvert> => {
  return await database('caretaker_advertisement').where({ id }).del();
};

const uploadCaretakerAdvertImage = async (id: number, imageLink: string) => {
  return await database('caretaker_advertisement')
    .where({ id })
    .update('photo_link', `${imageLink}`);
};

export default {
  createCaretakerAdvert,
  getCaretakerAdvertById,
  getCaretakerAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert,
  getUserCaretakerAdvert,
  getCaretakerAvailability,
  insertCaretakerAvailability,
  deleteCaretakerAvailability,
  uploadCaretakerAdvertImage,
  addAdvertisementCount,
  removeAdvertisementCount
};
