const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
});
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);
