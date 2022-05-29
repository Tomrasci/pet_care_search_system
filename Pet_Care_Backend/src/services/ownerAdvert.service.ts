import { IOwnerAdvert } from '../models/interfaces/IOwnerAdvert';
import { IOwnerAdvertCreate } from '../models/interfaces/IOwnerAdvertCreate';
import ownerAdvertModel from '../models/ownerAdvert.model';

const createOwnerAdvert = async (cAdvert: IOwnerAdvertCreate) => {
  return await ownerAdvertModel.createOwnerAdvert(cAdvert);
};

const getOwnerAdvertById = async (id: number) => {
  return await ownerAdvertModel.getOwnerAdvertById(id);
};

const getUserOwnerAdvert = async (userId: number) => {
  return await ownerAdvertModel.getUserOwnerAdvert(userId);
};

const getOwnersAdverts = async () => {
  return await ownerAdvertModel.getOwnerAdverts();
};

const updateOwnerAdvert = async (cAdvert: IOwnerAdvertCreate, id: number) => {
  return await ownerAdvertModel.updateOwnerAdvert(cAdvert, id);
};
const deleteOwnerAdvert = async (id: number): Promise<IOwnerAdvert> => {
  return await ownerAdvertModel.deleteOwnerAdvert(id);
};
const uploadOwnerImage = async (oid: number, imageLink: string) => {
  return await ownerAdvertModel.uploadOwnerAdvertImage(oid, imageLink);
};

const addAdvertisementCount = async (id: number) => {
  return await ownerAdvertModel.addAdvertisementCount(id);
};
const removeAdvertisementCount = async (id: number) => {
  return await ownerAdvertModel.removeAdvertisementCount(id);
};

export default {
  createOwnerAdvert,
  getOwnerAdvertById,
  getOwnersAdverts,
  updateOwnerAdvert,
  deleteOwnerAdvert,
  getUserOwnerAdvert,
  uploadOwnerImage,
  addAdvertisementCount,
  removeAdvertisementCount
};
