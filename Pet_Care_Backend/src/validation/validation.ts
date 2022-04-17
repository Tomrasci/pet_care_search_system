import { IUser } from '../models/interfaces/IUser';
import Joi from 'joi';
import { ICaretakerAdvertCreate } from '../models/interfaces/ICaretakerAdvertCreate';

const validateUser = (user: IUser) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required()
  });
  return schema.validate(user);
};

const validateCaretakerAdvert = (caretakerAdvert: ICaretakerAdvertCreate) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    experience: Joi.string().required(),
    activity: Joi.string().required(),
    day_price: Joi.number().required(),
    description: Joi.string().required(),
    extra_information: Joi.string().allow(''),
    title: Joi.string().required(),
    languages: Joi.array().items(Joi.string()),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    user_id: Joi.number().required()
  });
  return schema.validate(caretakerAdvert);
};

export default { validateUser, validateCaretakerAdvert };
