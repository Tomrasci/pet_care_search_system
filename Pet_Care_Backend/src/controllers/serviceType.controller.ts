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

const insertCaretakerServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await serviceTypeService.insertCaretakerServices(req.body.services);
    logger.info(
      `Caretaker services have been inserted  ${JSON.stringify(
        req.body.services
      )}`
    );
    return res.status(ResponseCodes.OK).json(req.body.services);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getServiceType,
  getServiceTypes,
  insertCaretakerServices
};
