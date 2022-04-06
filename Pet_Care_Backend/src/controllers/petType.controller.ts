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

export default {
  getPetType,
  getPetTypes
};
