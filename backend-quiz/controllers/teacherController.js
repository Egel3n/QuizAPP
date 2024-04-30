const Teacher = require("../models/Teacher");

const teachers_get = (req, res) => {
  Teacher.find()
    .sort({ name: 1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const teacher_create = (req, res) => {
  const teacher = new Teacher(req.body);
  teacher
    .save()
    .then((result) => {
      res.send("Teacher Created").statusCode(201);
    })
    .catch((err) => {
      res.send(err);
    });
};

const teacher_by_id = (req, res) => {
  Teacher.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { teachers_get, teacher_create, teacher_by_id };
