const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  examID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  questionString: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
