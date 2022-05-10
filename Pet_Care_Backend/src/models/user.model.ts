import database from '../../database/db';
import { IUser } from './interfaces/IUser';
import { IUserGet } from './interfaces/IUserGet';

const createUser = async (user: IUser): Promise<IUser> => {
  return await database('user').insert({
    ...user
  });
};

const getUserById = async (id: number): Promise<IUser> => {
  return await database('user').where({ id }).select().first();
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  return await database('user').where({ email }).select().first();
};

const getUserByUsername = async (username: string): Promise<IUser> => {
  return await database('user').where({ username }).select().first();
};

const changeProfile = async (user: IUser, id: number) => {
  return await database('user')
    .where({ id })
    .update({
      ...user,
      updated_at: database.fn.now()
    });
};
const getNonAdminUsers = async (): Promise<IUserGet[]> => {
  return await database('user').whereNot({ role: 1 }).select();
};

const changePassword = async (password: string, id: number) => {
  return await database('user').where({ id }).update({
    password: password
  });
};

const updateUser = async (user: IUserGet, id: number) => {
  return await database('user')
    .where({ id })
    .update({
      ...user,
      updated_at: database.fn.now()
    });
};

const deleteUser = async (id: number) => {
  return await database('user').where({ id }).del();
};

export default {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  changeProfile,
  changePassword,
  getNonAdminUsers,
  updateUser,
  deleteUser
};
