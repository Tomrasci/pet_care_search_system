import database from '../../database/db';
import { ICaretakerAdvertCreate } from './interfaces/ICaretakerAdvertCreate';

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

export default { createCaretakerAdvert };
