const Student = require("../models/Student");
const Exam = require("../models/Exam");
const StudentExam = require("../models/StudentExam");

const studentExam_create = (req, res) => {
  const studentExam = new StudentExam(req.body);
  const examID = req.body.examID;
  const studentID = req.body.studentID;

  Exam.findById(examID).then((result) => {
    if (result === null) {
      res.status(404);
      res.send("Invalid ExamID");
    } else {
      Student.findById(studentID).then((result1) => {
        if (result1 === null) {
          res.status(404);
          res.send("Invalid Student");
        } else {
          studentExam.save().then((result3) => {
            res.send("UserExam Created");
          });
        }
      });
    }
  });
};

const studentExam_isActive = (req, res) => {
  const studentID = req.params.studentID;
  const examID = req.params.examID;

  StudentExam.findOne({ studentID: studentID, examID: examID })
    .then((result) => {
      res.json(result.active);
    })
    .catch((err) => {
      res.json(err);
    });
};

const studentExam_update = (req, res) => {};

module.exports = { studentExam_create, studentExam_isActive };
