const usersRouter = require('express').Router();
const { getUsers, createUser, getUserById, updateUser } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUser);

module.exports = { usersRouter };
