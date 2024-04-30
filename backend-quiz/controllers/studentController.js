const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const student_by_username = (req, res) => {
  Student.findOne({ username: req.params.username })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const student_create = (req, res) => {
  const student = new Student(req.body);
  Teacher.findById(student.teacherID).then((result) => {
    if (result === null) {
      res.send("Invalid Teacher");
    } else {
      student.save().then(() => {
        res.json("Student Created.");
      });
    }
  });
};

const students_by_teacher = (req, res) => {
  Student.find({ teacherID: req.params.teacherID })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { student_by_username, student_create, students_by_teacher };
