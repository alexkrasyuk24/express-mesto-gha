import bcrypt from 'bcrypt';

const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { errorStatuses } = require('../utils/errors/constans');
const { handleDefaultError } = require('../utils/errors/handleDefaultError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => handleDefaultError(res));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatuses.badRequest).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      handleDefaultError(res);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      return next(new NotFoundError('Пользователь не найден.'));
    }
    // возвращаем пользователя, если он есть
    return res.status(200).send(user);
  }).catch(next);
};

const login = (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email })
    .select('+password');
    
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  getCurrentUser,
};
