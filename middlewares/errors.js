const { errorStatuses } = require('../utils/errors/constans');

const errorsMiddleware = (err, req, res, next) => {
  const { message = 'На сервере произошла ошибка.', statusCode = 500 } = err;
  if (err.code === 11000) {
    res.status(errorStatuses.conflict).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorsMiddleware };
