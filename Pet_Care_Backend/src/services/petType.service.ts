import petTypesModel from '../models/petTypes.model';
import { ICaretakerPet } from '../models/interfaces/ICaretakerPet';

const getPetTypeById = async (id: number) => {
  return await petTypesModel.getPetTypeById(id);
};

const getPetTypes = async () => {
  return await petTypesModel.getPetTypes();
};

const getCaretakerPets = async (pid: number) => {
  return await petTypesModel.getCaretakerPets(pid);
};

const insertCaretakerPets = async (petArray: ICaretakerPet[]) => {
  return await petTypesModel.insertCaretakerPets(petArray);
};

const deleteCaretakerPets = async (id: number) => {
  return await petTypesModel.deleteCaretakerPets(id);
};

const getOwnerPets = async (pid: number) => {
  return await petTypesModel.getOwnerPets(pid);
};

const insertOwnerPets = async (petArray: ICaretakerPet[]) => {
  return await petTypesModel.insertOwnerPets(petArray);
};

const deleteOwnerPets = async (id: number) => {
  return await petTypesModel.deleteOwnerPets(id);
};
const getCaretakerPetNames = async (id: number) => {
  return await petTypesModel.getCaretakerPetNames(id);
};

const getOwnerPetNames = async (id: number) => {
  return await petTypesModel.getOwnerPetNames(id);
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
