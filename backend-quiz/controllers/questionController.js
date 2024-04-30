const Question = require("../models/Question");
const Exam = require("../models/Exam");

const questions_by_examID = (req, res) => {
  const examID = req.params.id;
  Question.find({ examID: examID })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(505);
      res.json(err);
    });
};

const question_create = (req, res) => {
  const examID = req.body.examID;
  Exam.findById(examID)
    .then((result) => {
      if (result === null) {
        res.status(404);
        res.send("Invalid ExamID");
      } else {
        const question = new Question(req.body);
        question
          .save()
          .then((result1) => {
            res.status(201);
            res.send("Question created");
          })
          .catch((err) => {
            res.status(505);
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.status(505);
      res.json(err);
    });
};

module.exports = { questions_by_examID, question_create };
