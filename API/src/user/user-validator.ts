import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    userName: Joi.string().default('').allow(null),
    parentUserId: Joi.string().default(null).allow(null),
    phoneNumberPrimary: Joi.number().default(null).allow(null),
    phoneNumberSecondary: Joi.number().default(null).allow(null),
    mobilePrimary: Joi.number().default(null).allow(null),
    mobileSecondary: Joi.number().default(null).allow(null),
    address: Joi.string().default(null).allow(null),
    description: Joi.string().default(null).allow(null),
    subscriptionStartDate: Joi.date().default(null).allow(null),
    subscriptionEndDate: Joi.date().default(null).allow(null),
    createdBy: Joi.string().default(null).allow(null),
    isActive: Joi.boolean().default(true).allow(null)
});

export const updateUserModel = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().trim().required(),
  userName: Joi.string().default('').allow(null),
  parentUserId: Joi.string().default(null).allow(null),
  phoneNumberPrimary: Joi.number().default(null).allow(null),
  phoneNumberSecondary: Joi.number().default(null).allow(null),
  mobilePrimary: Joi.number().default(null).allow(null),
  mobileSecondary: Joi.number().default(null).allow(null),
  address: Joi.string().default(null).allow(null),
  description: Joi.string().default(null).allow(null),
  subscriptionStartDate: Joi.date().default(null).allow(null),
  subscriptionEndDate: Joi.date().default(null).allow(null),
  updatedBy: Joi.string().default(null).allow(null),
  isActive: Joi.boolean().default(true).allow(null)
});

export const loginUserModel = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();
