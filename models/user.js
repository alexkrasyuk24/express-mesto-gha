const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля "name" - 2'],
      maxLength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const User = mongoose.model('user', userSchema);
module.exports = { User };
