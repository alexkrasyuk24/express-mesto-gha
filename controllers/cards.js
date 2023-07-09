const { Card } = require('../models/card');

const getCards = (req, res) => {
  // Card.find({})
  //   .then((cards) => res.send({ cards }))
  //   .catch((err) => res.status(500).send({ message: err.message }));
  res.send({ data: 'test' });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getCards, createCard };
