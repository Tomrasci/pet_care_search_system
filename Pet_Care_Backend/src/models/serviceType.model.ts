import database from '../../database/db';
import { IServiceType } from './interfaces/IServiceType';
import { ICaretakerService } from './interfaces/ICaretakerService';

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

const getCaretakerServices = async (
  aid: number
): Promise<ICaretakerService[]> => {
  try {
    return await database('caretaker_services')
      .where({
        advertisement_id: aid
      })
      .select();
  } catch (err) {
    console.log(err.message);
  }
};

const insertCaretakerServices = async (serviceArray: ICaretakerService[]) => {
  try {
    const fieldsToInsert = serviceArray.map((field) => ({
      service_type_id: field.service_type_id,
      advertisement_id: field.advertisement_id
    }));
    return await database('caretaker_services').insert(fieldsToInsert);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteCaretakerServices = async (id: number) => {
  try {
    return await database('caretaker_services')
      .where({ advertisement_id: id })
      .del();
  } catch (err) {
    console.log(err.message);
  }
};
export default {
  getServiceTypeById,
  getServiceTypes,
  getCaretakerServices,
  insertCaretakerServices,
  deleteCaretakerServices
};
