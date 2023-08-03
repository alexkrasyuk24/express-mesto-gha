const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, getCurrentUser,
} = require('../controllers/users');
const {
  celebrateUpdateUser,
  celebrateUpdateAvatar,
} = require('../celebrate/users');

usersRouter.get('/', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', celebrateUpdateUser, updateUser);
usersRouter.patch('/me/avatar', celebrateUpdateAvatar, updateUser);

module.exports = { usersRouter };
