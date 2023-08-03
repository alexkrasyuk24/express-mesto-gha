const { celebrate, Joi } = require('celebrate');
const { imageUrlRegex } = require('../utils/errors/constans');

const celebrateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(imageUrlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const celebrateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(imageUrlRegex),
  }),
});

module.exports = {
  celebrateSignUp,
  celebrateSignIn,
  celebrateUpdateUser,
  celebrateUpdateAvatar,
};
