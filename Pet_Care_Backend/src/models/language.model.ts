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
  pid: number,
  aid: number
): Promise<ICaretakerLanguage[]> => {
  try {
    return await database('caretaker_languages')
      .where({
        language_id: pid,
        advertisement_id: aid
      })
      .first()
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertCaretakerLanguages = async (
  languageArray: ICaretakerLanguage[]
) => {
  try {
    const fieldsToInsert = languageArray.map((field) => ({
      language_id: field.language_id,
      advertisement_id: field.advertisement_id
    }));
    return await database('caretaker_languages').insert(fieldsToInsert);
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getLanguageById,
  getLanguages,
  getCaretakerLanguages,
  insertCaretakerLanguages
};
