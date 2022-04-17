import database from '../../database/db';
import { ICaretakerAdvertCreate } from './interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from './interfaces/ICaretakerAdvert';
import { ICaretakerAvailability } from './interfaces/ICaretakerAvailability';

const createCaretakerAdvert = async (cAdvert: ICaretakerAdvertCreate) => {
  try {
    return await database('caretaker_advertisement')
      .insert({
        ...cAdvert
      })
      .then((id) => {
        return database('caretaker_advertisement')
          .where({ id })
          .first()
          .select();
      });
  } catch (err) {
    console.log(err.message);
  }
};
const getCaretakerAdvertById = async (
  id: number
): Promise<ICaretakerAdvert> => {
  try {
    return await database('caretaker_advertisement')
      .where({ id })
      .first()
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const getUserCaretakerAdverts = async (
  userId: number
): Promise<ICaretakerAdvert[]> => {
  try {
    return await database('caretaker_advertisement')
      .where({ user_id: userId })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const getCaretakerAdverts = async (): Promise<ICaretakerAdvert[]> => {
  try {
    return await database('caretaker_advertisement').select();
  } catch (err) {
    console.log(err.message);
  }
};

const getCaretakerAvailability = async (
  id: number
): Promise<ICaretakerAvailability[]> => {
  try {
    return await database(`caretaker_availability`)
      .where({ advertisement_id: id })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertCaretakerAvailability = async (
  availabilityArray: ICaretakerAvailability[]
) => {
  try {
    return await database('caretaker_availability').insert(availabilityArray);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteCaretakerAvailability = async (id: number) => {
  try {
    return await database('caretaker_availability')
      .where({ advertisement_id: id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

const updateCareTakerAdvert = async (
  cAdvert: ICaretakerAdvertCreate,
  id: number
): Promise<ICaretakerAdvertCreate> => {
  try {
    return await database('caretaker_advertisement')
      .where({ id })
      .update({
        ...cAdvert,
        updated_at: database.fn.now()
      });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteCareTakerAdvert = async (id: number): Promise<ICaretakerAdvert> => {
  try {
    return await database('caretaker_advertisement').where({ id }).del();
  } catch (err) {
    console.log(err.message);
  }
};
export default {
  createCaretakerAdvert,
  getCaretakerAdvertById,
  getCaretakerAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert,
  getUserCaretakerAdverts,
  getCaretakerAvailability,
  insertCaretakerAvailability,
  deleteCaretakerAvailability
};
