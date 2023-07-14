const { errorStatuses } = require('./constans');

const handleDefaultError = (res) => {
  res.status(errorStatuses.serverError).send({ message: 'На сервере произошла ошибка' });
};

module.exports = { handleDefaultError };
