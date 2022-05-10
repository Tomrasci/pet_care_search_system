import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import userService from '../services/user.service';
import validation from '../validation/validation';
import bcrypt from 'bcryptjs';
import ApiError from '../../error/ApiError';
import { ResponseCodes } from '../utils/responseCodes';
import { IUser } from '../models/interfaces/IUser';
import { IUserGet } from '../models/interfaces/IUserGet';
import caretakerAdvertService from '../services/caretakerAdvert.service';
import isEmpty from '../utils/Empty';
import commentService from '../services/comment.service';
import serviceTypeService from '../services/serviceType.service';
import languageService from '../services/language.service';
import reservationService from '../services/reservation.service';
import petTypeService from '../services/petType.service';
import ownerAdvertService from '../services/ownerAdvert.service';
import { ICaretakerAdvert } from '../models/interfaces/ICaretakerAdvert';

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

  await userService.registerUser(user);
  res.status(ResponseCodes.CREATED).send(req.body);
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
    surname: user.surname,
    city: user.city,
    id: user.id,
    role: user.role,
    advert_count: user.advert_count,
    accessToken: token
  });
};

const changeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = await userService.getUserById(req.body.user.id);
  if (req.body.email && req.body.email !== user.email) {
    const testUserEmail = await userService.getUserByEmail(req.body.email);
    if (testUserEmail) {
      next(
        ApiError.duplicateEntryError(
          `User with email ${req.body.email} already exists`
        )
      );
      return;
    }
  }
  if (req.body.username && req.body.username !== user.username) {
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
  }
  if (user) {
    const newUser = {
      ...user,
      name: req.body.name || user.name,
      surname: req.body.surname || user.surname,
      phone: req.body.phone || user.phone,
      city: req.body.city || user.city,
      address: req.body.address || user.address,
      username: req.body.username || user.username,
      email: req.body.email || user.email
    };

    const updatedUser = await userService.changeProfile(
      newUser,
      req.body.user.id
    );

    return res.status(ResponseCodes.OK).json(updatedUser);
  } else {
    return next(ApiError.badRequestError(`Something went wrong`));
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = await userService.getUserById(req.body.user.id);
  if (user) {
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password as string
    );
    if (!passwordIsValid) {
      return next(ApiError.unauthorizedError(`Invalid username or password`));
    }
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const changed = await userService.changePassword(
      newPassword,
      req.body.user.id
    );
    return res.status(ResponseCodes.OK).json(changed);
  }
};

const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = await userService.getUserById(req.body.user.id);
  if (user) {
    return res.status(ResponseCodes.OK).json(user);
  } else {
    next(ApiError.notFoundError(`User not found`));
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = await userService.getUserById(Number(req.params.id));
  if (!user) {
    next(ApiError.notFoundError(`User not found`));
  } else {
    if (user.role === 2) {
      const neededCareTakerAdvert: ICaretakerAdvert =
        await caretakerAdvertService.getUserCaretakerAdvert(Number(user.id));
      if (neededCareTakerAdvert) {
        const comments = await commentService.getAdvertisementComments(
          Number(neededCareTakerAdvert.id)
        );
        comments.forEach(async function (comment) {
          await commentService.deleteComment(comment.id);
        });
        await caretakerAdvertService.deleteCaretakerAvailability(
          Number(neededCareTakerAdvert.id)
        );
        await petTypeService.deleteCaretakerPets(
          Number(neededCareTakerAdvert.id)
        );
        await serviceTypeService.deleteCaretakerServices(
          Number(neededCareTakerAdvert.id)
        );
        await languageService.deleteCaretakerLangauges(
          Number(neededCareTakerAdvert.id)
        );
        await reservationService.deleteAdvertisementReservations(
          Number(neededCareTakerAdvert.id)
        );

        await caretakerAdvertService.deleteCareTakerAdvert(
          Number(neededCareTakerAdvert.id)
        );
      }
    }

    if (user.role === 3) {
      const neededOwnerAdvert = await ownerAdvertService.getUserOwnerAdvert(
        Number(req.params.id)
      );
      if (neededOwnerAdvert) {
        await petTypeService.deleteOwnerPets(Number(neededOwnerAdvert.id));
        await serviceTypeService.deleteOwnerServices(
          Number(neededOwnerAdvert.id)
        );
        await languageService.deleteOwnerLangauges(
          Number(neededOwnerAdvert.id)
        );

        await ownerAdvertService.deleteOwnerAdvert(
          Number(neededOwnerAdvert.id)
        );
      }
    }
    await userService.deleteUser(Number(req.params.id));
    return res.sendStatus(200);
  }
};

const getNonAdminUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users: IUserGet[] = await userService.getNonAdminUsers();
  if (users) {
    return res.status(ResponseCodes.OK).json(users);
  } else {
    next(ApiError.notFoundError('Users were not gotten'));
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUserGet = await userService.getUserById(req.body.id);
  if (req.body.email && req.body.email !== user.email) {
    const testUserEmail = await userService.getUserByEmail(req.body.email);
    if (testUserEmail) {
      next(
        ApiError.duplicateEntryError(
          `User with email ${req.body.email} already exists`
        )
      );
      return;
    }
  }
  if (req.body.username && req.body.username !== user.username) {
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
  }
  if (user) {
    const newUser = {
      ...user,
      name: req.body.name || user.name,
      surname: req.body.surname || user.surname,
      phone: req.body.phone || user.phone,
      city: req.body.city || user.city,
      address: req.body.address || user.address,
      username: req.body.username || user.username,
      email: req.body.email || user.email
    };

    const updatedUser = await userService.updateUser(req.body.id, newUser);

    return res.status(ResponseCodes.OK).json(updatedUser);
  } else {
    return next(ApiError.badRequestError(`Something went wrong`));
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.Access_Token_Secret, {
    expiresIn: process.env.jwtExpiration
  });
}

export default {
  register,
  login,
  changeProfile,
  getUserDetails,
  changePassword,
  getNonAdminUsers,
  updateUser,
  deleteUser
};
