/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connecting the database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {}).catch((error) => {
  console.log('Could not connect to the MongoDB Database: ', error.message);
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Database connection established successfully');
});

//importing the route files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
