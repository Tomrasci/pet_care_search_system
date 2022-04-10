import database from '../../database/db';
import { IUser } from './interfaces/IUser';

const createUser = async (user: IUser): Promise<IUser> => {
  return await database('user').insert({
    ...user
  });
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  return await database('user')
    .where({ email })
    .select('username', 'password', 'email', 'phone', 'address', 'id')
    .first();
};

const getUserByUsername = async (username: string): Promise<IUser> => {
  return await database('user')
    .where({ username })
    .select('username', 'password', 'email', 'phone', 'address', 'id')
    .first();
};

export default {
  createUser,
  getUserByEmail,
  getUserByUsername
};
