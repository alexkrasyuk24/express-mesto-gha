const express = require('express');

const cardsRouter = express.Router();
const {
  getCards,
  createCard,
  getCardById,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.get('/:cardId', getCardById);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = { cardsRouter };
