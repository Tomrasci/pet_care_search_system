import database from '../../database/db';
import { IServiceType } from './interfaces/IServiceType';
import { ICaretakerService } from './interfaces/ICaretakerService';

const getServiceTypeById = async (id: number): Promise<IServiceType> => {
  return await database('service_type').where({ id }).first().select();
};

const getServiceTypes = async (): Promise<IServiceType[]> => {
  return await database('service_type').select();
};

const getCaretakerServices = async (
  aid: number
): Promise<ICaretakerService[]> => {
  return await database('caretaker_services')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertCaretakerServices = async (serviceArray: ICaretakerService[]) => {
  const fieldsToInsert = serviceArray.map((field) => ({
    service_type_id: field.service_type_id,
    advertisement_id: field.advertisement_id
  }));
  return await database('caretaker_services').insert(fieldsToInsert);
};

const deleteCaretakerServices = async (id: number) => {
  return await database('caretaker_services')
    .where({ advertisement_id: id })
    .del();
};

const getOwnerServices = async (aid: number): Promise<ICaretakerService[]> => {
  return await database('owner_services')
    .where({
      advertisement_id: aid
    })
    .select();
};

const insertOwnerServices = async (serviceArray: ICaretakerService[]) => {
  const fieldsToInsert = serviceArray.map((field) => ({
    service_type_id: field.service_type_id,
    advertisement_id: field.advertisement_id
  }));
  return await database('owner_services').insert(fieldsToInsert);
};

const deleteOwnerServices = async (id: number) => {
  return await database('owner_services').where({ advertisement_id: id }).del();
};
const getCaretakerServiceNames = async (id: number) => {
  return await database(`caretaker_services`)
    .where('advertisement_id', id)
    .join(
      `service_type`,
      `caretaker_services.service_type_id`,
      `service_type.id`
    )
    .select('service_type.name');
};

const getOwnerServiceNames = async (id: number) => {
  return await database(`owner_services`)
    .where('advertisement_id', id)
    .join(`service_type`, `owner_services.service_type_id`, `service_type.id`)
    .select('service_type.name');
};

export default {
  getServiceTypeById,
  getServiceTypes,
  getCaretakerServices,
  insertCaretakerServices,
  deleteCaretakerServices,
  getOwnerServices,
  insertOwnerServices,
  deleteOwnerServices,
  getCaretakerServiceNames,
  getOwnerServiceNames
};
