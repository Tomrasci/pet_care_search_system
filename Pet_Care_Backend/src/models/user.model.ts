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
  try {
    return await database('user')
      .where({ id })
      .update({
        ...user,
        updated_at: database.fn.now()
      });
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUser
};
