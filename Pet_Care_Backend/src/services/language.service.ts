import languageModel from '../models/language.model';
import { ICaretakerLanguage } from '../models/interfaces/ICaretakerLanguage';

const getLanguageById = async (id: number) => {
  return await languageModel.getLanguageById(id);
};

const getLanguages = async () => {
  return await languageModel.getLanguages();
};

const getCaretakerLanguages = async (pid: number, aid: number) => {
  return await languageModel.getCaretakerLanguages(pid, aid);
};

const insertCaretakerLanguages = async (
  languageArray: ICaretakerLanguage[]
) => {
  return await languageModel.insertCaretakerLanguages(languageArray);
};

const deleteCaretakerLangauges = async (id: number) => {
  return await languageModel.deleteCaretakerLanguages(id);
};

export default {
  getLanguageById,
  getLanguages,
  getCaretakerLanguages,
  insertCaretakerLanguages,
  deleteCaretakerLangauges
};
