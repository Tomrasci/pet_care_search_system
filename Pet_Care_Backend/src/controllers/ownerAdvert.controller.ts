/* eslint-disable dot-notation */
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import validation from '../validation/validation';
import ApiError from '../../error/ApiError';
import { ResponseCodes } from '../utils/responseCodes';
import isEmpty from '../utils/Empty';
import { ICaretakerPet } from '../models/interfaces/ICaretakerPet';
import petTypeService from '../services/petType.service';
import { ICaretakerService } from '../models/interfaces/ICaretakerService';
import serviceTypeService from '../services/serviceType.service';
import { ICaretakerLanguage } from '../models/interfaces/ICaretakerLanguage';
import languageService from '../services/language.service';
import { IOwnerAdvertCreate } from '../models/interfaces/IOwnerAdvertCreate';
import ownerAdvertService from '../services/ownerAdvert.service';
import fixJSONType from '../utils/fixJsonType';
import { INamesObject } from '../models/interfaces/INamesObject';
import MapObjectNamesToStringArray from '../utils/MapObjectNamesToStringArray';
import { IOwnerAdvertGot } from '../models/interfaces/IOwnerAdvertGot';

const createOwnerAdvertisement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerAdvert: IOwnerAdvertCreate = {
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    phone: req.body.phone,
    title: req.body.title,
    description: req.body.description,
    extra_information: req.body.extra_information,
    startDate: req.body.startDate,
    endDate: req.body.endDate || null,
    day_price: req.body.day_price,
    user_id: req.body.user_id,
    time_intervals: req.body.time_intervals.toString()
  };
  const { error } = validation.validateOwnerAdvert(ownerAdvert);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }

  const insertedOwnerAdvertisement = await ownerAdvertService.createOwnerAdvert(
    ownerAdvert
  );

  logger.info(`Caretaker advertisement created`);

  const oAdvertId = insertedOwnerAdvertisement.id;
  const petTypesArray = req.body.pets;
  const ownerPets: ICaretakerPet[] = petTypesArray.map((pet: number) => ({
    pet_type_id: pet,
    advertisement_id: oAdvertId
  }));

  try {
    await petTypeService.insertOwnerPets(ownerPets);
    logger.info(`Owner pets have been inserted  ${JSON.stringify(ownerPets)}`);
  } catch (err) {
    logger.error(err);
  }

  const serviceTypesArray = req.body.services;
  const ownerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: oAdvertId
    })
  );

  try {
    await serviceTypeService.insertOwnerServices(ownerServices);
    logger.info(
      `Owner services have been inserted  ${JSON.stringify(ownerServices)}`
    );
  } catch (err) {
    console.log(err);
  }
  const languagesArray = req.body.languages;
  const ownerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: oAdvertId
    })
  );

  try {
    await languageService.insertOwnerLanguages(ownerLanguages);
    logger.info(
      `Owner languages have been inserted  ${JSON.stringify(ownerLanguages)}`
    );
  } catch (err) {
    console.log(err);
  }

  return res.status(ResponseCodes.CREATED).send(insertedOwnerAdvertisement);
};

const uploadOwnerPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req['file'] &&
    !req['file'].originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
  ) {
    res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' });
  }

  let image;
  if (req['file']) {
    image = req['file'].filename;
  } else {
    image = process.env.PICTURE_DIR + process.env.DEFAULT_PICTURE_NAME;
  }
  await ownerAdvertService.uploadOwnerImage(Number(req.params.id), image);
  return res.status(ResponseCodes.OK).send('Success');
};

const getOwnerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oAdvert = await ownerAdvertService.getOwnerAdvertById(
    Number(req.params.id)
  );

  const newInterv: string[] = fixJSONType(oAdvert.time_intervals);
  const ownerLanguages: INamesObject[] =
    await languageService.getOwnerLanguageNames(oAdvert.id);
  const ownerPets: INamesObject[] = await petTypeService.getOwnerPetNames(
    oAdvert.id
  );
  const ownerServices: INamesObject[] =
    await serviceTypeService.getOwnerServiceNames(oAdvert.id);

  const languages = MapObjectNamesToStringArray(ownerLanguages);
  const pets = MapObjectNamesToStringArray(ownerPets);
  const services = MapObjectNamesToStringArray(ownerServices);

  const fullAdvert: IOwnerAdvertGot = {
    ...oAdvert,
    languages: languages,
    services: services,
    pets: pets,
    time_intervals: newInterv
  };

  logger.info(`Owner advert has been retrieved with id  ${req.params.id}`);
  return res.status(ResponseCodes.OK).json(fullAdvert);
};

const getOwnerAdverts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdverts = await ownerAdvertService.getOwnersAdverts();

  return res.status(ResponseCodes.OK).json(cAdverts);
};

const getUserOwnerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oAdvert = await ownerAdvertService.getUserOwnerAdvert(
    Number(req.params.userId)
  );

  return res.status(ResponseCodes.OK).json(oAdvert);
};

const updateOwnerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editedOwnerAdvert: IOwnerAdvertCreate = {
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    phone: req.body.phone,
    title: req.body.title,
    description: req.body.description,
    extra_information: req.body.extra_information,
    startDate: req.body.startDate,
    endDate: req.body.endDate || null,
    day_price: req.body.day_price,
    user_id: req.body.user_id,
    time_intervals: req.body.time_intervals.toString()
  };
  const { error } = validation.validateOwnerAdvert(editedOwnerAdvert);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }
  const oAdvertId = Number(req.params.id);
  const neededOwnerAdvert = await ownerAdvertService.getOwnerAdvertById(
    oAdvertId
  );
  if (isEmpty(neededOwnerAdvert)) {
    logger.info(`Owner advert with id  ${oAdvertId}  was not found to update`);
    return next(
      ApiError.notFoundError(`Owner advert was not found with id  ${oAdvertId}`)
    );
  }

  try {
    await ownerAdvertService.updateOwnerAdvert(editedOwnerAdvert, oAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }

  try {
    await petTypeService.deleteOwnerPets(oAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  try {
    await languageService.deleteOwnerLangauges(oAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }
  try {
    await serviceTypeService.deleteOwnerServices(oAdvertId);
  } catch (err) {
    logger.error(err);
    throw err;
  }

  const petTypesArray = req.body.pets;
  const ownerPets: ICaretakerPet[] = petTypesArray.map((pet: number) => ({
    pet_type_id: pet,
    advertisement_id: oAdvertId
  }));
  try {
    await petTypeService.insertOwnerPets(ownerPets);
    logger.info(
      `Owner pets have been inserted after edit ${JSON.stringify(ownerPets)}`
    );
  } catch (err) {
    console.log(err);
  }

  const serviceTypesArray = req.body.services;
  const ownerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: oAdvertId
    })
  );

  try {
    await serviceTypeService.insertOwnerServices(ownerServices);
    logger.info(
      `Owner services have been inserted after edit ${JSON.stringify(
        ownerServices
      )}`
    );
  } catch (err) {
    console.log(err);
  }
  const languagesArray = req.body.languages;
  const ownerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: oAdvertId
    })
  );
  try {
    await languageService.insertOwnerLanguages(ownerLanguages);
    logger.info(
      `Owner languages have been inserted  ${JSON.stringify(ownerLanguages)}`
    );
  } catch (err) {
    console.log(err);
  }

  const updatedOwnerAdvert = await ownerAdvertService.getOwnerAdvertById(
    oAdvertId
  );
  logger.info(
    `Owner advert  ${updatedOwnerAdvert}  has successfully been updated`
  );
  return res.status(ResponseCodes.OK).json(updateOwnerAdvert);
};

const deleteOwnerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const neededOwnerAdvert = await ownerAdvertService.getOwnerAdvertById(
    Number(req.params.id)
  );
  if (isEmpty(neededOwnerAdvert)) {
    logger.info(
      `Owner advert with id  ${req.params.id}  was not found to update`
    );
    return next(
      ApiError.notFoundError(
        `Owner advert was not found with id  ${req.params.id}`
      )
    );
  }

  await petTypeService.deleteOwnerPets(Number(req.params.id));
  await serviceTypeService.deleteOwnerServices(Number(req.params.id));
  await languageService.deleteOwnerLangauges(Number(req.params.id));

  await ownerAdvertService.deleteOwnerAdvert(Number(req.params.id));

  logger.info(
    `Owner advert ${neededOwnerAdvert} has successfully been deleted`
  );
  return res.status(ResponseCodes.OK).json('Owner advert deleted sucessfully');
};

const getOwnerLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerLanguages = await languageService.getOwnerLanguages(
    Number(req.params.id)
  );
  logger.info(
    `Owner languages have been retrieved  ${JSON.stringify(ownerLanguages)}`
  );
  return res.status(ResponseCodes.OK).json(ownerLanguages);
};

const getOwnerPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerPets = await petTypeService.getOwnerPets(Number(req.params.id));
  logger.info(`Owner pets have been retrieved  ${JSON.stringify(ownerPets)}`);
  return res.status(ResponseCodes.OK).json(ownerPets);
};

const getOwnerServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ownerServices = await serviceTypeService.getOwnerServices(
    Number(req.params.id)
  );
  logger.info(
    `Owner services have been retrieved  ${JSON.stringify(ownerServices)}`
  );
  return res.status(ResponseCodes.OK).json(ownerServices);
};

export default {
  createOwnerAdvertisement,
  getOwnerAdvert,
  getOwnerAdverts,
  updateOwnerAdvert,
  deleteOwnerAdvert,
  getUserOwnerAdvert,
  getOwnerLanguages,
  getOwnerPets,
  getOwnerServices,
  uploadOwnerPhoto
};
