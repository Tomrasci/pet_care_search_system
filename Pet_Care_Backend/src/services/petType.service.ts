import petTypesModel from '../models/petTypes.model';
import { ICaretakerPet } from '../models/interfaces/ICaretakerPet';

const getPetTypeById = async (id: number) => {
  return await petTypesModel.getPetTypeById(id);
};

const getPetTypes = async () => {
  return await petTypesModel.getPetTypes();
};

const getCaretakerPets = async (pid: number, aid: number) => {
  return await petTypesModel.getCaretakerPets(pid, aid);
};

const insertCaretakerPets = async (petArray: ICaretakerPet[]) => {
  return await petTypesModel.insertCaretakerPets(petArray);
};

export default {
  getPetTypeById,
  getPetTypes,
  getCaretakerPets,
  insertCaretakerPets
};
