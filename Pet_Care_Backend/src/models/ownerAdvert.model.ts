import database from '../../database/db';
import { IOwnerAdvert } from './interfaces/IOwnerAdvert';
import { IOwnerAdvertCreate } from './interfaces/IOwnerAdvertCreate';

const createOwnerAdvert = async (oAdvert: IOwnerAdvertCreate) => {
  return await database('owner_advertisement')
    .insert({
      ...oAdvert
    })
    .then((id) => {
      return database('owner_advertisement').where({ id }).first().select();
    });
};
const getOwnerAdvertById = async (id: number): Promise<IOwnerAdvert> => {
  return await database('owner_advertisement').where({ id }).first().select();
};

const getUserOwnerAdvert = async (userId: number): Promise<IOwnerAdvert> => {
  return await database('owner_advertisement')
    .where({ user_id: userId })
    .select()
    .first();
};

const getOwnerAdverts = async (): Promise<IOwnerAdvert[]> => {
  return await database('owner_advertisement').select();
};

const updateOwnerAdvert = async (
  oAdvert: IOwnerAdvertCreate,
  id: number
): Promise<IOwnerAdvertCreate> => {
  return await database('owner_advertisement')
    .where({ id })
    .update({
      ...oAdvert,
      updated_at: database.fn.now()
    });
};

const deleteOwnerAdvert = async (id: number): Promise<IOwnerAdvert> => {
  return await database('owner_advertisement').where({ id }).del();
};

const uploadOwnerAdvertImage = async (id: number, imageLink: string) => {
  return await database('owner_advertisement')
    .where({ id })
    .update('photo_link', `${imageLink}`);
};

export default {
  createOwnerAdvert,
  getOwnerAdvertById,
  getOwnerAdverts,
  updateOwnerAdvert,
  deleteOwnerAdvert,
  getUserOwnerAdvert,
  uploadOwnerAdvertImage
};
