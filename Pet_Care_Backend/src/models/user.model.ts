import database from '../../database/db';
import { IUser } from './interfaces/IUser';

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

const updateUser = async (user: IUser, id: number) => {
  return await database('user')
    .where({ id })
    .update({
      ...user,
      updated_at: database.fn.now()
    });
};

const changePassword = async (password: string, id: number) => {
  return await database('user').where({ id }).update({
    password: password
  });
};

export default {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUser,
  changePassword
};
