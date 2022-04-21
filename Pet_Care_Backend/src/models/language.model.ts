import database from '../../database/db';
import { ILanguage } from './interfaces/ILanguage';
import { ICaretakerLanguage } from './interfaces/ICaretakerLanguage';

const getLanguageById = async (id: number): Promise<ILanguage> => {
  try {
    return await database('language').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getLanguages = async (): Promise<ILanguage[]> => {
  try {
    return await database('language').select();
  } catch (err) {
    console.log(err.message);
  }
};

const getCaretakerLanguages = async (
  aid: number
): Promise<ICaretakerLanguage[]> => {
  try {
    return await database('caretaker_languages')
      .where({
        advertisement_id: aid
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertCaretakerLanguages = async (
  languageArray: ICaretakerLanguage[]
) => {
  try {
    return await database('caretaker_languages').insert(languageArray);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteCaretakerLanguages = async (id: number) => {
  try {
    return await database('caretaker_languages')
      .where({ advertisement_id: id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnerLanguages = async (
  aid: number
): Promise<ICaretakerLanguage[]> => {
  try {
    return await database('owner_languages')
      .where({
        advertisement_id: aid
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertOwnerLanguages = async (languageArray: ICaretakerLanguage[]) => {
  try {
    return await database('owner_languages').insert(languageArray);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOwnerLanguages = async (id: number) => {
  try {
    return await database('owner_languages')
      .where({ advertisement_id: id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getLanguageById,
  getLanguages,
  getCaretakerLanguages,
  insertCaretakerLanguages,
  deleteCaretakerLanguages,
  getOwnerLanguages,
  insertOwnerLanguages,
  deleteOwnerLanguages
};
