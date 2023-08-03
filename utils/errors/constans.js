const errorStatuses = {
  badRequest: 400,
  notFound: 404,
  serverError: 500,
  conflict: 409,
};

const SECRET_KEY = 'some-secret-key';

const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg))/i;

module.exports = {
  errorStatuses,
  SECRET_KEY,
  imageUrlRegex,
};
