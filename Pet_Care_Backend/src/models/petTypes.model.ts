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

const getCaretakerPets = async (aid: number): Promise<ICaretakerPet[]> => {
  try {
    return await database('caretaker_pets')
      .where({
        advertisement_id: aid
      })
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

const deleteCaretakerPets = async (id: number) => {
  try {
    return await database('caretaker_pets')
      .where({ advertisement_id: id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnerPets = async (aid: number): Promise<ICaretakerPet[]> => {
  try {
    return await database('owner_pets')
      .where({
        advertisement_id: aid
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertOwnerPets = async (petArray: ICaretakerPet[]) => {
  try {
    const fieldsToInsert = petArray.map((field) => ({
      pet_type_id: field.pet_type_id,
      advertisement_id: field.advertisement_id
    }));
    return await database('owner_pets').insert(fieldsToInsert);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOwnerPets = async (id: number) => {
  try {
    return await database('owner_pets').where({ advertisement_id: id }).del();
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  getPetTypeById,
  getPetTypes,
  getCaretakerPets,
  insertCaretakerPets,
  deleteCaretakerPets,
  getOwnerPets,
  insertOwnerPets,
  deleteOwnerPets
};
