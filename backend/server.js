const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const courses = [
  {id: 1, name: "learn Node"},
  {id: 2, name: "learn Express"},
  {id: 3, name: "learn react"}
];

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.get('/', function (req, res) {
  res.send(req.originalUrl);
  console.dir(req.originalUrl);
});

app.get('/api/courses/:id', function (req, res) {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("Sorry there are no courses availabe with this name")
  res.send( course);
});

app.post('/api/courses', function (req, res) {
  // NPM jio is useful to validate, we can create schema for this
  const course = {
    id: courses.length+1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});