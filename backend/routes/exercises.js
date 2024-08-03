/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//1st Route (Get all exercises)
router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((error) => res.status(400).json('Error: ' + error));
});

//2nd Route (Get Exercise by id)
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((error) => res.status(400).json('Error: ' + error));
});

//3rd Route (Add exercise)
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise
    .save()
    .then(() => res.json('Exercise Added'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

//4th Route (Delete exercise by id)
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

//5th Route (Update exercise by id)
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json('Exercise Updated'))
        .catch((error) => res.status(400).json('Error: ' + error));
    })
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;
