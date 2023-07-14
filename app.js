const express = require('express');
const mongoose = require('mongoose');
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64af2a071860694bb2d5932c',
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
});
