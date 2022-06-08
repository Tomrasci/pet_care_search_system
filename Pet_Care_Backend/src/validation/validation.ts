import { IUser } from '../models/interfaces/IUser';
import Joi from 'joi';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';
import { IOwnerAdvertCreate } from '../models/interfaces/IOwnerAdvertCreate';
import { IComment } from '../models/interfaces/IComment';

const validateUser = (user: IUser) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    role: Joi.number().required(),
    city: Joi.string().required()
  });
  return schema.validate(user);
};

const validateCaretakerAdvert = (caretakerAdvert: ICaretakerAdvertCreate) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    experience: Joi.string().required(),
    activity: Joi.string().required(),
    hour_price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    extra_information: Joi.string().allow(''),
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    user_id: Joi.number().required()
  });
  return schema.validate(caretakerAdvert);
};

const validateOwnerAdvert = (ownerAdvert: IOwnerAdvertCreate) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    hour_price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    extra_information: Joi.string().allow(''),
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null).allow(''),
    time_intervals: Joi.string(),
    user_id: Joi.number().required()
  });
  return schema.validate(ownerAdvert);
};

const validateComment = (comment: IComment) => {
  const schema = Joi.object().keys({
    description: Joi.string().required(),
    user_id: Joi.number().required(),
    advertisement_id: Joi.number().required()
  });
  return schema.validate(comment);
};

export default {
  validateUser,
  validateCaretakerAdvert,
  validateOwnerAdvert,
  validateComment
};
