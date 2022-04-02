import caretakerAdvertModel from '../models/caretakerAdvert.model';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';

const createCaretakerAdvert = async (cAdvert: ICaretakerAdvertCreate) => {
  return await caretakerAdvertModel.createCaretakerAdvert(cAdvert);
};

export default { createCaretakerAdvert };
