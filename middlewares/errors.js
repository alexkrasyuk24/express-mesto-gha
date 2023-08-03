const { errorStatuses } = require('../utils/errors/constans');

const errorsMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'На сервере произошла ошибка.';

  if (err.code === 11000) {
    res.status(errorStatuses.conflict).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }

  res.status(status).send({ message });
  next();
};

module.exports = { errorsMiddleware };
