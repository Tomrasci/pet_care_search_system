import serviceTypeService from '../services/serviceType.service';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';

const getServiceType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceType = await serviceTypeService.getServiceTypeById(
    Number(req.params.id)
  );
  logger.info(`Service type  has been retrieved with id  ${req.params.id}`);
  return res.status(ResponseCodes.OK).json(serviceType);
};

const getServiceTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceTypes = await serviceTypeService.getServiceTypes();
  logger.info(
    `Service types have been retrieved  ${JSON.stringify(serviceTypes)}`
  );
  return res.status(ResponseCodes.OK).json(serviceTypes);
};

export default {
  getServiceType,
  getServiceTypes
};
