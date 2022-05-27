/* eslint-disable dot-notation */
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
import fixWeekDayArray from '../utils/mapWeekdayArray';
import MapObjectNamesToStringArray from '../utils/MapObjectNamesToStringArray';
import { INamesObject } from '../models/interfaces/INamesObject';
import { ICaretakerAdvert } from '../models/interfaces/ICaretakerAdvert';
import commentService from '../services/comment.service';
import reservationService from '../services/reservation.service';

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
    city: req.body.city,
    hour_price: req.body.hour_price,
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

  await petTypeService.insertCaretakerPets(caretakerPets);
  logger.info(
    `Caretaker pets have been inserted  ${JSON.stringify(caretakerPets)}`
  );

  const mondayArray = req.body.monday;
  const fixedMondayArray = fixWeekDayArray(mondayArray, 'Mon', cAdvertId);

  const tuesdayArray = req.body.tuesday;
  const fixedTuesdayArray = fixWeekDayArray(tuesdayArray, 'Tue', cAdvertId);

  const wednesdayArray = req.body.wednesday;
  const fixedWednesdayArray = fixWeekDayArray(wednesdayArray, 'Wed', cAdvertId);

  const thursdayArray = req.body.thursday;
  const fixedThursdayArray = fixWeekDayArray(thursdayArray, 'Thu', cAdvertId);

  const fridayArray = req.body.friday;
  const fixedFridayArray = fixWeekDayArray(fridayArray, 'Fri', cAdvertId);

  const saturdayArray = req.body.saturday;
  const fixedSaturdayArray = fixWeekDayArray(saturdayArray, 'Sat', cAdvertId);

  const sundayArray = req.body.sunday;
  const fixedSundayArray = fixWeekDayArray(sundayArray, 'Sun', cAdvertId);

  await caretakerAdvertService.insertCaretakerAvailability(fixedMondayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedTuesdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedWednesdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedThursdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedFridayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedSaturdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedSundayArray);

  logger.info(`Caretaker times have been inserted`);

  const serviceTypesArray = req.body.services;
  const caretakerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: cAdvertId
    })
  );

  await serviceTypeService.insertCaretakerServices(caretakerServices);
  logger.info(
    `Caretaker services have been inserted  ${JSON.stringify(
      caretakerServices
    )}`
  );

  const languagesArray = req.body.languages;
  const caretakerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: cAdvertId
    })
  );

  await languageService.insertCaretakerLanguages(caretakerLanguages);
  logger.info(
    `Caretaker languages have been inserted  ${JSON.stringify(
      caretakerLanguages
    )}`
  );

  return res.status(ResponseCodes.CREATED).send(insertedCaretakerAdvertisement);
};

const uploadCaretakerPhoto = async (
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
  await caretakerAdvertService.uploadCaretakerImage(
    Number(req.params.id),
    image
  );
  return res.status(ResponseCodes.OK).send('Success');
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

  const caretakerLanguages: INamesObject[] =
    await languageService.getCaretakerLanguageNames(cAdvert.id);
  const caretakerPets: INamesObject[] =
    await petTypeService.getCaretakerPetNames(cAdvert.id);
  const caretakerServices: INamesObject[] =
    await serviceTypeService.getCaretakerServiceNames(cAdvert.id);

  const languages = MapObjectNamesToStringArray(caretakerLanguages);
  const pets = MapObjectNamesToStringArray(caretakerPets);
  const services = MapObjectNamesToStringArray(caretakerServices);

  const fullAdvert: ICaretakerAdvert = {
    ...cAdvert,
    languages: languages,
    services: services,
    pets: pets
  };

  return res.status(ResponseCodes.OK).json(fullAdvert);
};

const getCareTakerAdverts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdverts = await caretakerAdvertService.getCareTakersAdverts();
  const newAdverts = [];

  for (const cAdvert of cAdverts) {
    const caretakerLanguages: INamesObject[] =
      await languageService.getCaretakerLanguageNames(cAdvert.id);
    const caretakerPets: INamesObject[] =
      await petTypeService.getCaretakerPetNames(cAdvert.id);
    const caretakerServices: INamesObject[] =
      await serviceTypeService.getCaretakerServiceNames(cAdvert.id);

    const languages = MapObjectNamesToStringArray(caretakerLanguages);
    const pets = MapObjectNamesToStringArray(caretakerPets);
    const services = MapObjectNamesToStringArray(caretakerServices);

    const fullAdvert: ICaretakerAdvert = {
      ...cAdvert,
      languages: languages,
      services: services,
      pets: pets
    };
    newAdverts.push(fullAdvert);
  }

  return res.status(ResponseCodes.OK).json(newAdverts);
};

const getUserCaretakerAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cAdvert = await caretakerAdvertService.getUserCaretakerAdvert(
    Number(req.params.userId)
  );

  const caretakerLanguages: INamesObject[] =
    await languageService.getCaretakerLanguageNames(cAdvert.id);
  const caretakerPets: INamesObject[] =
    await petTypeService.getCaretakerPetNames(cAdvert.id);
  const caretakerServices: INamesObject[] =
    await serviceTypeService.getCaretakerServiceNames(cAdvert.id);

  const languages = MapObjectNamesToStringArray(caretakerLanguages);
  const pets = MapObjectNamesToStringArray(caretakerPets);
  const services = MapObjectNamesToStringArray(caretakerServices);

  const fullAdvert: ICaretakerAdvert = {
    ...cAdvert,
    languages: languages,
    services: services,
    pets: pets
  };

  return res.status(ResponseCodes.OK).json(fullAdvert);
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
    city: req.body.city,
    hour_price: req.body.hour_price,
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
  if (!neededCareTakerAdvert || isEmpty(neededCareTakerAdvert)) {
    logger.info(
      `Caretaker advert with id  ${cAdvertId}  was not found to update`
    );
    return next(
      ApiError.notFoundError(
        `Caretaker advert was not found with id  ${cAdvertId}`
      )
    );
  }

  await caretakerAdvertService.updateCareTakerAdvert(
    editedCaretakerAdvert,
    cAdvertId
  );

  await caretakerAdvertService.deleteCaretakerAvailability(cAdvertId);

  await petTypeService.deleteCaretakerPets(cAdvertId);

  await languageService.deleteCaretakerLangauges(cAdvertId);

  await serviceTypeService.deleteCaretakerServices(cAdvertId);

  const mondayArray = req.body.monday;
  const fixedMondayArray = fixWeekDayArray(mondayArray, 'Mon', cAdvertId);

  const tuesdayArray = req.body.tuesday;
  const fixedTuesdayArray = fixWeekDayArray(tuesdayArray, 'Tue', cAdvertId);

  const wednesdayArray = req.body.wednesday;
  const fixedWednesdayArray = fixWeekDayArray(wednesdayArray, 'Wed', cAdvertId);

  const thursdayArray = req.body.thursday;
  const fixedThursdayArray = fixWeekDayArray(thursdayArray, 'Thu', cAdvertId);

  const fridayArray = req.body.friday;
  const fixedFridayArray = fixWeekDayArray(fridayArray, 'Fri', cAdvertId);

  const saturdayArray = req.body.saturday;
  const fixedSaturdayArray = fixWeekDayArray(saturdayArray, 'Sat', cAdvertId);

  const sundayArray = req.body.sunday;
  const fixedSundayArray = fixWeekDayArray(sundayArray, 'Sun', cAdvertId);

  await caretakerAdvertService.insertCaretakerAvailability(fixedMondayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedTuesdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedWednesdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedThursdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedFridayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedSaturdayArray);
  await caretakerAdvertService.insertCaretakerAvailability(fixedSundayArray);

  logger.info(`Caretaker times have been inserted`);

  const petTypesArray = req.body.pets;
  const caretakerPets: ICaretakerPet[] = petTypesArray.map((pet: number) => ({
    pet_type_id: pet,
    advertisement_id: cAdvertId
  }));

  await petTypeService.insertCaretakerPets(caretakerPets);
  logger.info(
    `Caretaker pets have been inserted after edit ${JSON.stringify(
      caretakerPets
    )}`
  );

  const serviceTypesArray = req.body.services;
  const caretakerServices: ICaretakerService[] = serviceTypesArray.map(
    (service: number) => ({
      service_type_id: service,
      advertisement_id: cAdvertId
    })
  );

  await serviceTypeService.insertCaretakerServices(caretakerServices);
  logger.info(
    `Caretaker services have been inserted after edit ${JSON.stringify(
      caretakerServices
    )}`
  );

  const languagesArray = req.body.languages;
  const caretakerLanguages: ICaretakerLanguage[] = languagesArray.map(
    (language: number) => ({
      language_id: language,
      advertisement_id: cAdvertId
    })
  );

  await languageService.insertCaretakerLanguages(caretakerLanguages);
  logger.info(
    `Caretaker languages have been inserted  ${JSON.stringify(
      caretakerLanguages
    )}`
  );

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
  if (!neededCareTakerAdvert || isEmpty(neededCareTakerAdvert)) {
    logger.info(
      `Caretaker advert with id  ${req.params.id}  was not found to delete`
    );
    return next(
      ApiError.notFoundError(
        `Caretaker advert was not found with id  ${req.params.id}`
      )
    );
  }
  const comments = await commentService.getAdvertisementComments(
    Number(req.params.id)
  );
  comments.forEach(async function (comment) {
    await commentService.deleteComment(comment.id);
  });
  await caretakerAdvertService.deleteCaretakerAvailability(
    Number(req.params.id)
  );
  await petTypeService.deleteCaretakerPets(Number(req.params.id));
  await serviceTypeService.deleteCaretakerServices(Number(req.params.id));
  await languageService.deleteCaretakerLangauges(Number(req.params.id));
  await reservationService.deleteAdvertisementReservations(
    Number(req.params.id)
  );

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
  getUserCaretakerAdvert,
  getCaretakerLanguages,
  getCaretakerPets,
  getCaretakerServices,
  getCaretakerAvailability,
  uploadCaretakerPhoto
};
