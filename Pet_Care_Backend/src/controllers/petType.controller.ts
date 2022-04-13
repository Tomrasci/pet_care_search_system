import petTypeService from '../services/petType.service';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';

const getPetType = async (req: Request, res: Response, next: NextFunction) => {
  const petType = await petTypeService.getPetTypeById(Number(req.params.id));
  logger.info(`Pet type  has been retrieved with id  ${req.params.id}`);
  return res.status(ResponseCodes.OK).json(petType);
};

const getPetTypes = async (req: Request, res: Response, next: NextFunction) => {
  const petTypes = await petTypeService.getPetTypes();
  logger.info(`Pet types have been retrieved  ${JSON.stringify(petTypes)}`);
  return res.status(ResponseCodes.OK).json(petTypes);
};

const insertCaretakerPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await petTypeService.insertCaretakerPets(req.body.pets);
    logger.info(
      `Caretaker pets have been inserted  ${JSON.stringify(req.body.pets)}`
    );
    return res.status(ResponseCodes.OK).json(req.body.pets);
  } catch (err) {
    console.log(err);
  }
};
export default {
  getPetType,
  getPetTypes,
  insertCaretakerPets
};
