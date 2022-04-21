import languageModel from '../models/language.model';
import { ICaretakerLanguage } from '../models/interfaces/ICaretakerLanguage';

const getLanguageById = async (id: number) => {
  return await languageModel.getLanguageById(id);
};

const getLanguages = async () => {
  return await languageModel.getLanguages();
};

const getCaretakerLanguages = async (aid: number) => {
  return await languageModel.getCaretakerLanguages(aid);
};

const insertCaretakerLanguages = async (
  languageArray: ICaretakerLanguage[]
) => {
  return await languageModel.insertCaretakerLanguages(languageArray);
};

const deleteCaretakerLangauges = async (id: number) => {
  return await languageModel.deleteCaretakerLanguages(id);
};

const getOwnerLanguages = async (aid: number) => {
  return await languageModel.getOwnerLanguages(aid);
};

const insertOwnerLanguages = async (languageArray: ICaretakerLanguage[]) => {
  return await languageModel.insertOwnerLanguages(languageArray);
};

const deleteOwnerLangauges = async (id: number) => {
  return await languageModel.deleteOwnerLanguages(id);
};

export default {
  getLanguageById,
  getLanguages,
  getCaretakerLanguages,
  insertCaretakerLanguages,
  deleteCaretakerLangauges,
  getOwnerLanguages,
  insertOwnerLanguages,
  deleteOwnerLangauges
};
