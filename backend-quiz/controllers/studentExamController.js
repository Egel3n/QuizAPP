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
          studentExam
            .save()
            .then((result3) => {
              res.send("UserExam Created");
            })
            .catch((err) => {
              res.json(err);
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
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const studentExam_update = (req, res) => {
  const userID = req.body.userid;
  const examID = req.body.examid;
  const score = req.body.score;
  console.log("userID:" + userID);
  console.log("examID:" + examID);
  console.log("score:" + score);

  console.log("HELLO WORLD");

  StudentExam.updateOne(
    { studentID: userID, examID },
    { active: 0, result: score }
  )
    .then((result) => {
      res.status(204).json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
class StudentAndResult {
  constructor(studentID, result, name) {
    this.studentID = studentID;
    this.result = result;
    this.name = name;
  }
}

const students_by_examID = (req, res) => {
  const examID = req.params.id;
  const studentIDs = [];
  const students = [];
  StudentExam.find({ examID })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};

module.exports = {
  studentExam_create,
  studentExam_isActive,
  studentExam_update,
  students_by_examID,
};
