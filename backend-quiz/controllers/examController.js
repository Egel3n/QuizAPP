const Exam = require("../models/Exam");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const exam_create = (req, res) => {
  const exam = new Exam(req.body);
  Teacher.findById(exam.teacherID).then((result) => {
    if (result === null) {
      res.status(404);
      res.send("Invalid TeacherID");
    } else {
      exam
        .save()
        .then((result) => {
          res.status(201);
          res.json("Exam Created");
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    }
  });
};

const exam_list_by_student_id = (req, res) => {
  Student.findById(req.params.id)
    .then((result) => {
      if (result === null) {
        res.status(404);
        res.json("Invalid ExamID");
      } else {
        const teacherID = result.teacherID;
        Exam.find({ teacherID: teacherID })
          .then((result1) => {
            res.status(200);
            res.json(result1);
          })
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const exam_list_by_teacher_id = (req, res) => {
  const teacherID = req.params.id;
  Teacher.findById(teacherID).then((result) => {
    if (result === null) {
      res.status(404);
    } else {
      Exam.find({ teacherID: teacherID })
        .then((result1) => {
          res.json(result1);
        })
        .catch((err) => {
          res.status(501);
          res.json(err);
        });
    }
  });
};

module.exports = {
  exam_create,
  exam_list_by_student_id,
  exam_list_by_teacher_id,
};
