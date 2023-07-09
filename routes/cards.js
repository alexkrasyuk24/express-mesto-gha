const express = require('express');

const cardsRouter = express.Router();
const { getCards, createCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
// cardsRouter.get('/:userId');
cardsRouter.post('/', createCard);

module.exports = { cardsRouter };
