import database from '../../database/db';
import { ICaretakerPet } from './interfaces/ICareTakerPet';
import { IPetType } from './interfaces/IPetType';

const getPetTypeById = async (id: number): Promise<IPetType> => {
  return await database('pet_type').where({ id }).first().select();
};

const getPetTypes = async (): Promise<IPetType[]> => {
  return await database('pet_type').select();
};

const getCaretakerPets = async (aid: number): Promise<ICaretakerPet[]> => {
  return await database('caretaker_pets')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertCaretakerPets = async (petArray: ICaretakerPet[]) => {
  const fieldsToInsert = petArray.map((field) => ({
    pet_type_id: field.pet_type_id,
    advertisement_id: field.advertisement_id
  }));
  return await database('caretaker_pets').insert(fieldsToInsert);
};

const deleteCaretakerPets = async (id: number) => {
  return await database('caretaker_pets').where({ advertisement_id: id }).del();
};

const getOwnerPets = async (aid: number): Promise<ICaretakerPet[]> => {
  return await database('owner_pets')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertOwnerPets = async (petArray: ICaretakerPet[]) => {
  const fieldsToInsert = petArray.map((field) => ({
    pet_type_id: field.pet_type_id,
    advertisement_id: field.advertisement_id
  }));
  return await database('owner_pets').insert(fieldsToInsert);
};

const deleteOwnerPets = async (id: number) => {
  return await database('owner_pets').where({ advertisement_id: id }).del();
};

const getCaretakerPetNames = async (id: number) => {
  return await database(`caretaker_pets`)
    .where('advertisement_id', id)
    .join(`pet_type`, `caretaker_pets.pet_type_id`, `pet_type.id`)
    .select('pet_type.name');
};

const getOwnerPetNames = async (id: number) => {
  return await database(`owner_pets`)
    .where('advertisement_id', id)
    .join(`pet_type`, `owner_pets.pet_type_id`, `pet_type.id`)
    .select('pet_type.name');
};

export default {
  getPetTypeById,
  getPetTypes,
  getCaretakerPets,
  insertCaretakerPets,
  deleteCaretakerPets,
  getOwnerPets,
  insertOwnerPets,
  deleteOwnerPets,
  getCaretakerPetNames,
  getOwnerPetNames
};
