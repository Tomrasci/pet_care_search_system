import database from '../../database/db';
import { ICaretakerAdvertCreate } from './interfaces/ICaretakerAdvertCreate';
import { ICaretakerAdvert } from './interfaces/ICaretakerAdvert';

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

const getCaretakerAdverts = async (): Promise<ICaretakerAdvert[]> => {
  try {
    return await database('caretaker_advertisement').select();
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
  deleteCareTakerAdvert
};
