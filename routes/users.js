const usersRouter = require('express').Router();

usersRouter.get('/');
usersRouter.get('/:userId');
usersRouter.post('/');

module.exports = { usersRouter };
