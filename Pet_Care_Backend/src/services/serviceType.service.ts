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

const getOwnerServices = async (aid: number) => {
  return await serviceTypeModel.getOwnerServices(aid);
};

const insertOwnerServices = async (serviceArray: ICaretakerService[]) => {
  return await serviceTypeModel.insertOwnerServices(serviceArray);
};

const deleteOwnerServices = async (id: number) => {
  return await serviceTypeModel.deleteOwnerServices(id);
};
const getCaretakerServiceNames = async (id: number) => {
  return await serviceTypeModel.getCaretakerServiceNames(id);
};

export default {
  getServiceTypeById,
  getServiceTypes,
  getCaretakerServices,
  insertCaretakerServices,
  deleteCaretakerServices,
  getOwnerServices,
  insertOwnerServices,
  deleteOwnerServices,
  getCaretakerServiceNames
};
