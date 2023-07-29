const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUser);

module.exports = { usersRouter };
