const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  teacherID: {
    type: mongoose.Types.ObjectId,
    required: [true, "Plesase choose a teacher"],
  },
  username: {
    type: String,
    required: [true, "Please enter an username"],
    minlength: [5, "Minimum username length is 5 character"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum passowrd length is 6 character"],
  },
});

studentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
