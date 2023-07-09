const { User } = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about } = req.body;

  User.create({ name, about })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getUsers, createUser };
