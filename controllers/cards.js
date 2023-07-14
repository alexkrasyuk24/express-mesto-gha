const { Card } = require('../models/card');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { errorStatuses } = require('../utils/errors/constans');
const { handleDefaultError } = require('../utils/errors/handleDefaultError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => handleDefaultError(res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorStatuses.badRequest).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      handleDefaultError(res);
    });
};

const getCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then(() => {
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(errorStatuses.notFound).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errorStatuses.badRequest).send({ message: 'Передан некорректный id' });
        return;
      }
      handleDefaultError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  getCardById,
  deleteCardById,
  likeCard,
  dislikeCard,
};
