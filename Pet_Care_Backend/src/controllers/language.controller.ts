import languageService from '../services/language.service';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import { ResponseCodes } from '../utils/responseCodes';

const getLanguage = async (req: Request, res: Response, next: NextFunction) => {
  const language = await languageService.getLanguageById(Number(req.params.id));
  logger.info(`Language has been retrieved with id  ${req.params.id}`);
  return res.status(ResponseCodes.OK).json(language);
};

const getLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const languages = await languageService.getLanguages();
  logger.info(`Languages have been retrieved  ${JSON.stringify(languages)}`);
  return res.status(ResponseCodes.OK).json(languages);
};

export default { getLanguage, getLanguages };
