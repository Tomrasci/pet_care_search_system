import database from '../../database/db';
import { IPetType } from './interfaces/IPetType';

const getPetTypeById = async (id: number): Promise<IPetType> => {
  try {
    return await database('pet_type').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getPetTypes = async (): Promise<IPetType[]> => {
  try {
    return await database('pet_type').select();
  } catch (err) {
    console.log(err.message);
  }
};
export default { getPetTypeById, getPetTypes };
