import serviceTypeModel from '../models/serviceType.model';

const getServiceTypeById = async (id: number) => {
  return await serviceTypeModel.getServiceTypeById(id);
};

const getServiceTypes = async () => {
  return await serviceTypeModel.getServiceTypes();
};

export default {
  getServiceTypeById,
  getServiceTypes
};
