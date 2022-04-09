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
    day_price: req.body.day_price
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
  logger.info(
    `Caretaker adverts have been retrieved  ${JSON.stringify(cAdverts)}`
  );
  return res.status(ResponseCodes.OK).json(cAdverts);
};

const updateCareTakerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validation.validateCaretakerAdvert(req.body);
  if (error) {
    logger.error(`Body validation failed ${error.message}`);
    return next(
      ApiError.badRequestError(`Body validation failed ${error.message}`)
    );
  }
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
  await caretakerAdvertService.updateCareTakerAdvert(
    req.body,
    Number(req.params.id)
  );
  const updatedCareTakerAdvert =
    await caretakerAdvertService.getCareTakerAdvertById(Number(req.params.id));
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
  await caretakerAdvertService.deleteCareTakerAdvert(Number(req.params.id));

  logger.info(
    `Caretaker advert ${neededCareTakerAdvert} has successfully been deleted`
  );
  return res
    .status(ResponseCodes.OK)
    .json('Caretaker advert deleted sucessfully');
};

export default {
  createCaretakerAdvertisement,
  getCareTakerAdvert,
  getCareTakerAdverts,
  updateCareTakerAdvert,
  deleteCareTakerAdvert
};
