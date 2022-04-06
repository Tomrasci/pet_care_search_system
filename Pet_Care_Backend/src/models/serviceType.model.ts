import database from '../../database/db';
import { IServiceType } from './interfaces/IServiceType';

const getServiceTypeById = async (id: number): Promise<IServiceType> => {
  try {
    return await database('service_type').where({ id }).first().select();
  } catch (err) {
    console.log(err.message);
  }
};

const getServiceTypes = async (): Promise<IServiceType[]> => {
  try {
    return await database('service_type').select();
  } catch (err) {
    console.log(err.message);
  }
};
export default { getServiceTypeById, getServiceTypes };
