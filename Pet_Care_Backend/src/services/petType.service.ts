import petTypesModel from '../models/petTypes.model';

const getPetTypeById = async (id: number) => {
  return await petTypesModel.getPetTypeById(id);
};

const getPetTypes = async () => {
  return await petTypesModel.getPetTypes();
};

export default {
  getPetTypeById,
  getPetTypes
};
