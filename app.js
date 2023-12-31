const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const { errorsMiddleware } = require('./middlewares/errors');
const { authMiddleware } = require('./middlewares/auth');
const { celebrateSignIn, celebrateSignUp } = require('./celebrate/users');
const { NotFoundError } = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signup', celebrateSignUp, createUser);
app.post('/signin', celebrateSignIn, login);

app.use('/cards', authMiddleware, cardsRouter);
app.use('/users', authMiddleware, usersRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
