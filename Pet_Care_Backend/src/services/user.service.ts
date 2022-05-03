import userModel from '../models/user.model';
import { IUser } from '../models/interfaces/IUser';

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

const updateUser = async (user: IUser, id: number) => {
  return await userModel.updateUser(user, id);
};

const changePassword = async (password: string, id: number) => {
  return await userModel.changePassword(password, id);
};

export default {
  registerUser,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  updateUser,
  changePassword
};
