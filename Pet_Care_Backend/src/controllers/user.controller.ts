import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import userService from '../services/user.service';
import validation from '../validation/validation';
import bcrypt from 'bcryptjs';
import ApiError from '../../error/ApiError';
import { ResponseCodes } from '../utils/responseCodes';

const jwt = require('jsonwebtoken');

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = validation.validateUser(req.body);
  if (error) {
    logger.error('Body validation failed: ' + error);
    next(ApiError.badRequestError(`Body validation failed`));
    return;
  }
  const testUserEmail = await userService.getUserByEmail(req.body.email);
  if (testUserEmail) {
    next(
      ApiError.duplicateEntryError(
        `User with email ${req.body.email} already exists`
      )
    );
    return;
  }

  const testUserUsername = await userService.getUserByUsername(
    req.body.username
  );
  if (testUserUsername) {
    next(
      ApiError.duplicateEntryError(
        `User with username ${req.body.username} already exists`
      )
    );
    return;
  }
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    name: req.body.name,
    surname: req.body.surname,
    role: req.body.role,
    city: req.body.city,
    advert_count: 0
  };
  try {
    await userService.registerUser(user);
    res.status(ResponseCodes.CREATED).send(req.body);
  } catch (err) {
    logger.error('Registering user failed' + err);
    next(ApiError.internalError('Registering failed'));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    next(ApiError.unauthorizedError(`Invalid username or password`));
    return;
  }
  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password as string
  );

  if (!passwordIsValid) {
    next(ApiError.unauthorizedError(`Invalid username or password`));
    return;
  }
  const token = generateAccessToken({
    username: user.username,
    id: user.id,
    phone: user.phone,
    email: user.email,
    address: user.address,
    role: user.role,
    advert_count: user.advert_count
  });

  return res.status(ResponseCodes.OK).send({
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
    name: user.name,
    id: user.id,
    role: user.role,
    advert_count: user.advert_count,
    accessToken: token
  });
};

const usersPage = (req: Request, res: Response, next: NextFunction) => {
  res.status(ResponseCodes.OK).send('Authenticated. Welcome to users page.');
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.Access_Token_Secret, {
    expiresIn: process.env.jwtExpiration
  });
}

export default { register, login, usersPage };
