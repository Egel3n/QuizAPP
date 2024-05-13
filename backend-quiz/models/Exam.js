const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const StudentExam = require("../models/StudentExam");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  questionCount: {
    type: Number,
    required: true,
  },
  answerKey: {
    type: String,
    required: true,
  },
  teacherID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
examSchema.post("save", (result) => {
  Student.find({ teacherID: result.teacherID })
    .then((students) => {
      students.forEach((student) => {
        const studentExam = new StudentExam({
          active: true,
          result: 0,
          studentID: student._id,
          examID: result._id,
          studentName: student.name,
        });
        studentExam.save();
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
