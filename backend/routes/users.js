/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
let User = require('../models/user.model');

//1st Route (Get all users)
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json('Error: ' + error));
});

//2nd Route (add user)
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json('User Added'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;
