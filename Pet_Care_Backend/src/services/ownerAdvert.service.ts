import { IOwnerAdvert } from '../models/interfaces/IOwnerAdvert';
import { IOwnerAdvertCreate } from '../models/interfaces/IOwnerAdvertCreate';
import ownerAdvertModel from '../models/ownerAdvert.model';

const createOwnerAdvert = async (cAdvert: IOwnerAdvertCreate) => {
  return await ownerAdvertModel.createOwnerAdvert(cAdvert);
};

const getOwnerAdvertById = async (id: number) => {
  return await ownerAdvertModel.getOwnerAdvertById(id);
};

const getUserOwnerAdverts = async (userId: number) => {
  return await ownerAdvertModel.getUserOwnerAdverts(userId);
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

export default {
  createOwnerAdvert,
  getOwnerAdvertById,
  getOwnersAdverts,
  updateOwnerAdvert,
  deleteOwnerAdvert,
  getUserOwnerAdverts
};
