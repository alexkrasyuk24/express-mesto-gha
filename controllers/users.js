const { User } = require('../models/user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { errorStatuses } = require('../utils/errors/constans');
const { handleDefaultError } = require('../utils/errors/handleDefaultError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => handleDefaultError(res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
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

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
};
