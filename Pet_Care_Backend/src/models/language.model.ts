import database from '../../database/db';
import { ILanguage } from './interfaces/ILanguage';
import { ICaretakerLanguage } from './interfaces/ICaretakerLanguage';

const getLanguageById = async (id: number): Promise<ILanguage> => {
  return await database('language').where({ id }).first().select();
};

const getLanguages = async (): Promise<ILanguage[]> => {
  return await database('language').select();
};

const getCaretakerLanguages = async (
  aid: number
): Promise<ICaretakerLanguage[]> => {
  return await database('caretaker_languages')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertCaretakerLanguages = async (
  languageArray: ICaretakerLanguage[]
) => {
  return await database('caretaker_languages').insert(languageArray);
};

const deleteCaretakerLanguages = async (id: number) => {
  return await database('caretaker_languages')
    .where({ advertisement_id: id })
    .del();
};

const getOwnerLanguages = async (
  aid: number
): Promise<ICaretakerLanguage[]> => {
  return await database('owner_languages')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertOwnerLanguages = async (languageArray: ICaretakerLanguage[]) => {
  try {
    return await database('owner_languages').insert(languageArray);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOwnerLanguages = async (id: number) => {
  return await database('owner_languages')
    .where({ advertisement_id: id })
    .del();
};

const getCaretakerLanguageNames = async (id: number) => {
  return await database(`caretaker_languages`)
    .where('advertisement_id', id)
    .join(`language`, `caretaker_languages.language_id`, `language.id`)
    .select('language.name');
};

const getCOwnerLanguageNames = async (id: number) => {
  return await database(`owner_languages`)
    .where('advertisement_id', id)
    .join(`language`, `owner_languages.language_id`, `language.id`)
    .select('language.name');
};

export default {
  getLanguageById,
  getLanguages,
  getCaretakerLanguages,
  insertCaretakerLanguages,
  deleteCaretakerLanguages,
  getOwnerLanguages,
  insertOwnerLanguages,
  deleteOwnerLanguages,
  getCaretakerLanguageNames,
  getCOwnerLanguageNames
};
