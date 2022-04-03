import caretakerAdvertService from '../services/caretakerAdvert.service';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import validation from '../validation/validation';
import ApiError from '../../error/ApiError';
import { ResponseCodes } from '../utils/responseCodes';
import isEmpty from '../utils/Empty';

const createCaretakerAdvertisement = async (
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

  const insertedCaretakerAdvertisement =
    await caretakerAdvertService.createCaretakerAdvert(req.body);

  logger.info(`Caretaker advertisement created`);

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
