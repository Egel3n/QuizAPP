const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const port = 3000;
const hostname = "localhost";
const URI = "mongodb+srv://egelen:12345@quizapp.pjxkivb.mongodb.net/";
mongoose.connect(URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

//app.get("*", checkUser);

const teacherRoute = require("./routes/teacherRoutes");
app.use("/teacher", teacherRoute);
const studentRoute = require("./routes/studentRoutes");
app.use("/student", studentRoute);
const examRoute = require("./routes/examRoutes");
app.use("/exam", examRoute);
const questionRoute = require("./routes/questionRoutes");
app.use("/question", questionRoute);
const studentExamRoute = require("./routes/studentExamRoutes");
app.use("/studentexam", studentExamRoute);
app.listen(port, hostname, () => {
  console.log("Listenining on http://localhost:" + port);
});
app.use(authRoutes);
