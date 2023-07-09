const express = require('express');
const mongoose = require('mongoose');
const { cardsRouter } = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

// app.get('/cards', (req, res) => {
//   res.send({ data: 'test' });
// });
app.use('/cards', cardsRouter);
// app.use('/users', usersRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
});
