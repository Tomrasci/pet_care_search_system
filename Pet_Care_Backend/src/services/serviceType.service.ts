import serviceTypeModel from '../models/serviceType.model';
import { ICaretakerService } from '../models/interfaces/ICaretakerService';

const getServiceTypeById = async (id: number) => {
  return await serviceTypeModel.getServiceTypeById(id);
};

const getServiceTypes = async () => {
  return await serviceTypeModel.getServiceTypes();
};

const getCaretakerServices = async (aid: number) => {
  return await serviceTypeModel.getCaretakerServices(aid);
};

const insertCaretakerServices = async (serviceArray: ICaretakerService[]) => {
  return await serviceTypeModel.insertCaretakerServices(serviceArray);
};

const deleteCaretakerServices = async (id: number) => {
  return await serviceTypeModel.deleteCaretakerServices(id);
};

export default {
  getServiceTypeById,
  getServiceTypes,
  getCaretakerServices,
  insertCaretakerServices,
  deleteCaretakerServices
};
