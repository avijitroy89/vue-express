const express = require("express");
const router = express.Router();

const courses = [
    {id: 1, name: "learn Node"},
    {id: 2, name: "learn Express"},
    {id: 3, name: "learn react"}
  ];
  


router.get('/courses/:id', function (req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Sorry there are no courses availabe with this name")
    res.send(course);
});

router.post('/courses', function (req, res) {
    // NPM jio is useful to validate, we can create schema for this
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

module.exports = router;