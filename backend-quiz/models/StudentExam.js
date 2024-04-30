const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentExamSchema = new Schema({
  studentID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  examID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});

const studentExam = mongoose.model("StudentExamRel", studentExamSchema);

module.exports = studentExam;
