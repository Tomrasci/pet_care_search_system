import database from '../../database/db';
import { IOwnerAdvert } from './interfaces/IOwnerAdvert';
import { IOwnerAdvertCreate } from './interfaces/IOwnerAdvertCreate';

const createOwnerAdvert = async (oAdvert: IOwnerAdvertCreate) => {
  try {
    return await database('owner_advertisement')
      .insert({
        ...oAdvert
      })
      .then((id) => {
        return database('owner_advertisement').where({ id }).first().select();
      });
  } catch (err) {
    console.log(err.message);
  }
};
const getOwnerAdvertById = async (id: number): Promise<IOwnerAdvert> => {
  try {
    return await database('owner_advertisement').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getUserOwnerAdverts = async (userId: number): Promise<IOwnerAdvert[]> => {
  try {
    return await database('owner_advertisement')
      .where({ user_id: userId })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const getOwnerAdverts = async (): Promise<IOwnerAdvert[]> => {
  try {
    return await database('owner_advertisement').select();
  } catch (err) {
    console.log(err.message);
  }
};

const updateOwnerAdvert = async (
  oAdvert: IOwnerAdvertCreate,
  id: number
): Promise<IOwnerAdvertCreate> => {
  try {
    return await database('owner_advertisement')
      .where({ id })
      .update({
        ...oAdvert,
        updated_at: database.fn.now()
      });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOwnerAdvert = async (id: number): Promise<IOwnerAdvert> => {
  try {
    return await database('owner_advertisement').where({ id }).del();
  } catch (err) {
    console.log(err.message);
  }
};
export default {
  createOwnerAdvert,
  getOwnerAdvertById,
  getOwnerAdverts,
  updateOwnerAdvert,
  deleteOwnerAdvert,
  getUserOwnerAdverts
};
