const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  }],
  createdAT: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('card', cardSchema);
module.exports = { Card };
