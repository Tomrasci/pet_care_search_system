import caretakerAdvertService from '../services/caretakerAdvert.service';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import validation from '../validation/validation';
import ApiError from '../../error/ApiError';
import { ResponseCodes } from '../utils/responseCodes';
import isEmpty from '../utils/Empty';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';
import { ICaretakerPet } from '../models/interfaces/ICaretakerPet';
import petTypeService from '../services/petType.service';
import { ICaretakerService } from '../models/interfaces/ICaretakerService';
import serviceTypeService from '../services/serviceType.service';
import { ICaretakerLanguage } from '../models/interfaces/ICaretakerLanguage';
import languageService from '../services/language.service';

const createCaretakerAdvertisement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const caretakerAdvert: ICaretakerAdvertCreate = {
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    phone: req.body.phone,
    age: req.body.age,
    activity: req.body.activity,
    experience: req.body.experience,
    title: req.body.title,
    description: req.body.description,
    extra_information: req.body.extra_information,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day_price: req.body.day_price,
    user_id: req.body.user_id
  };
  const { error } = validation.validateCaretakerAdvert(caretakerAdvert);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }

  const insertedCaretakerAdvertisement =
    await caretakerAdvertService.createCaretakerAdvert(caretakerAdvert);

  logger.info(`Caretaker advertisement created`);

  const cAdvertId = insertedCaretakerAdvertisement.id;
  const petTypesArray = req.body.pets;
  const caretakerPets: ICaretakerPet[] = petTypesArray.map((pet: number) => ({
    pet_type_id: pet,
    advertisement_id: cAdvertId
  }));

  try {
    await petTypeService.insertCaretakerPets(caretakerPets);
    logger.info(
      `Caretaker pets have been inserted  ${JSON.stringify(caretakerPets)}`
    );
  } catch (err) {
    logger.error(err);
  }

  const serviceTypesArray = req.body.services;
  const caretakerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: cAdvertId
    })
  );

  try {
    await serviceTypeService.insertCaretakerServices(caretakerServices);
    logger.info(
      `Caretaker services have been inserted  ${JSON.stringify(
        caretakerServices
      )}`
    );
  } catch (err) {
    console.log(err);
  }
  const languagesArray = req.body.languages;
  const caretakerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: cAdvertId
    })
  );

  try {
    await languageService.insertCaretakerLanguages(caretakerLanguages);
    logger.info(
      `Caretaker languages have been inserted  ${JSON.stringify(
        caretakerLanguages
      )}`
    );
  } catch (err) {
    console.log(err);
  }

  return res.status(ResponseCodes.CREATED).send(insertedCaretakerAdvertisement);
};

const getCareTakerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdvert = await caretakerAdvertService.getCareTakerAdvertById(
    Number(req.params.id)
  );
  logger.info(`Caretaker advert has been retrieved with id  ${req.params.id}`);
  return res.status(ResponseCodes.OK).json(cAdvert);
};

const getCareTakerAdverts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdverts = await caretakerAdvertService.getCareTakersAdverts();

  return res.status(ResponseCodes.OK).json(cAdverts);
};

const getUserCaretakerAdverts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdverts = await caretakerAdvertService.getUserCaretakerAdverts(
    Number(req.params.userId)
  );

  return res.status(ResponseCodes.OK).json(cAdverts);
};

const getCaretakerAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAvailability = await caretakerAdvertService.getCaretakerLAvailability(
    Number(req.params.id)
  );

  return res.status(ResponseCodes.OK).json(cAvailability);
};

const updateCareTakerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editedCaretakerAdvert: ICaretakerAdvertCreate = {
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    phone: req.body.phone,
    age: req.body.age,
    activity: req.body.activity,
    experience: req.body.experience,
    title: req.body.title,
    description: req.body.description,
    extra_information: req.body.extra_information,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day_price: req.body.day_price,
    user_id: req.body.user_id
  };
  const { error } = validation.validateCaretakerAdvert(editedCaretakerAdvert);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }
  const cAdvertId = Number(req.params.id);
  const neededCareTakerAdvert =
    await caretakerAdvertService.getCareTakerAdvertById(cAdvertId);
  if (isEmpty(neededCareTakerAdvert)) {
    logger.info(
      `Caretaker advert with id  ${cAdvertId}  was not found to update`
    );
    return next(
      ApiError.notFoundError(
        `Caretaker advert was not found with id  ${cAdvertId}`
      )
    );
  }

  try {
    await caretakerAdvertService.updateCareTakerAdvert(
      editedCaretakerAdvert,
      cAdvertId
    );
  } catch (err) {
    logger.error(err);
    throw err;
  }
  try {
    await petTypeService.deleteCaretakerPets(cAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  try {
    await languageService.deleteCaretakerLangauges(cAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  try {
    await serviceTypeService.deleteCaretakerServices(cAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  const petTypesArray = req.body.pets;
  const caretakerPets: ICaretakerPet[] = petTypesArray.map((pet: number) => ({
    pet_type_id: pet,
    advertisement_id: cAdvertId
  }));
  try {
    await petTypeService.insertCaretakerPets(caretakerPets);
    logger.info(
      `Caretaker pets have been inserted after edit ${JSON.stringify(
        caretakerPets
      )}`
    );
  } catch (err) {
    console.log(err);
  }

  const serviceTypesArray = req.body.services;
  const caretakerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: cAdvertId
    })
  );

  try {
    await serviceTypeService.insertCaretakerServices(caretakerServices);
    logger.info(
      `Caretaker services have been inserted after edit ${JSON.stringify(
        caretakerServices
      )}`
    );
  } catch (err) {
    console.log(err);
  }
  const languagesArray = req.body.languages;
  const caretakerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: cAdvertId
    })
  );
  try {
    await languageService.insertCaretakerLanguages(caretakerLanguages);
    logger.info(
      `Caretaker languages have been inserted  ${JSON.stringify(
        caretakerLanguages
      )}`
    );
  } catch (err) {
    console.log(err);
  }

  const updatedCareTakerAdvert =
    await caretakerAdvertService.getCareTakerAdvertById(cAdvertId);
  logger.info(
    `Caretaker advert  ${updatedCareTakerAdvert}  has successfully been updated`
  );
  return res.status(ResponseCodes.OK).json(updateCareTakerAdvert);
};

const deleteCareTakerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const neededCareTakerAdvert =
    await caretakerAdvertService.getCareTakerAdvertById(Number(req.params.id));
  if (isEmpty(neededCareTakerAdvert)) {
    logger.info(
      `Caretaker advert with id  ${req.params.id}  was not found to update`
    );
    return next(
      ApiError.notFoundError(
        `Caretaker advert was not found with id  ${req.params.id}`
      )
    );
  }
  await petTypeService.deleteCaretakerPets(Number(req.params.id));
  await serviceTypeService.deleteCaretakerServices(Number(req.params.id));
  await languageService.deleteCaretakerLangauges(Number(req.params.id));

  await caretakerAdvertService.deleteCareTakerAdvert(Number(req.params.id));

  logger.info(
    `Caretaker advert ${neededCareTakerAdvert} has successfully been deleted`
  );
  return res
    .status(ResponseCodes.OK)
    .json('Caretaker advert deleted sucessfully');
};

const getCaretakerLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const caretakerLanguages = await languageService.getCaretakerLanguages(
    Number(req.params.id)
  );
  logger.info(
    `Caretaker languages have been retrieved  ${JSON.stringify(
      caretakerLanguages
    )}`
  );
  return res.status(ResponseCodes.OK).json(caretakerLanguages);
};

const getCaretakerPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const caretakerPets = await petTypeService.getCaretakerPets(
    Number(req.params.id)
  );
  logger.info(
    `Caretaker pets have been retrieved  ${JSON.stringify(caretakerPets)}`
  );
  return res.status(ResponseCodes.OK).json(caretakerPets);
};

const getCaretakerServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const caretakerServices = await serviceTypeService.getCaretakerServices(
    Number(req.params.id)
  );
  logger.info(
    `Caretaker services have been retrieved  ${JSON.stringify(
      caretakerServices
    )}`
  );
  return res.status(ResponseCodes.OK).json(caretakerServices);
};

export default {
  createCaretakerAdvertisement,
  getCareTakerAdvert,
  getCareTakerAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert,
  getUserCaretakerAdverts,
  getCaretakerLanguages,
  getCaretakerPets,
  getCaretakerServices,
  getCaretakerAvailability
};
