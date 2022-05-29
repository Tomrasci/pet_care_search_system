import userModel from '../models/user.model';
import { IUser } from '../models/interfaces/IUser';
import { IUserGet } from '../models/interfaces/IUserGet';

const registerUser = async (user: IUser): Promise<IUser> => {
  return await userModel.createUser(user);
};

const getUserByUsername = async (username: string) => {
  return await userModel.getUserByUsername(username);
};

const getUserByEmail = async (email: string) => {
  return await userModel.getUserByEmail(email);
};

const getUserById = async (id: number) => {
  return await userModel.getUserById(id);
};

const changeProfile = async (user: IUser, id: number) => {
  return await userModel.changeProfile(user, id);
};

const changePassword = async (password: string, id: number) => {
  return await userModel.changePassword(password, id);
};

const getNonAdminUsers = async () => {
  return await userModel.getNonAdminUsers();
};

const updateUser = async (id: number, user: IUserGet) => {
  return await userModel.updateUser(user, id);
};

const deleteUser = async (id: number) => {
  return await userModel.deleteUser(id);
};

const uploadUserImage = async (cid: number, imageLink: string) => {
  return await userModel.uploadUserImage(cid, imageLink);
};

export default {
  registerUser,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  changeProfile,
  changePassword,
  getNonAdminUsers,
  updateUser,
  deleteUser,
  uploadUserImage
};
