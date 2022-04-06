import database from '../../database/db';
import { ICaretakerPet } from './interfaces/ICareTakerPet';
import { IPetType } from './interfaces/IPetType';

const getPetTypeById = async (id: number): Promise<IPetType> => {
  try {
    return await database('pet_type').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getPetTypes = async (): Promise<IPetType[]> => {
  try {
    return await database('pet_type').select();
  } catch (err) {
    console.log(err.message);
  }
};

const getCaretakerPets = async (
  pid: number,
  aid: number
): Promise<ICaretakerPet[]> => {
  try {
    return await database('caretaker_pets')
      .where({
        pet_type_id: pid,
        advertisement_id: aid
      })
      .first()
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertCaretakerPets = async (petArray: ICaretakerPet[]) => {
  try {
    const fieldsToInsert = petArray.map((field) => ({
      pet_type_id: field.pet_type_id,
      advertisement_id: field.advertisement_id
    }));
    return await database('caretaker_pets').insert(fieldsToInsert);
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getPetTypeById,
  getPetTypes,
  getCaretakerPets,
  insertCaretakerPets
};
