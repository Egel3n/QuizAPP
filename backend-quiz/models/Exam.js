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

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
