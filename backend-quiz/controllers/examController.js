const Exam = require("../models/Exam");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const StudentExam = require("../models/StudentExam");

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
          res.json(result);
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

const exam_all_get = (req, res) => {
  Exam.find()
    .sort({ title: 1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const exam_list_active_student_id = async (req, res) => {
  console.log("active");
  Student.findById(req.params.id)
    .then((result) => {
      if (result === null) {
        res.status(404);
        res.json("Invalid ExamID");
      } else {
        const teacherID = result.teacherID;
        Exam.find({ teacherID: teacherID })
          .then((result1) => {
            const activeExams = result1.filter((exam) => {
              const examDate = new Date(exam.date);

              if (
                new Date(examDate.getTime() + exam.duration * 60000) >
                Date.now()
              ) {
                return true;
              }
            });
            res.status(200);
            res.json(activeExams);
          })
          .catch((err) => {
            res.json(err);
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
const exam_list_outdated_student_id = async (req, res) => {
  console.log("OUTDATED");
  Student.findById(req.params.id)
    .then((result) => {
      if (result === null) {
        res.status(404);
        res.json("Invalid ExamID");
      } else {
        const teacherID = result.teacherID;
        Exam.find({ teacherID: teacherID })
          .then((result1) => {
            const outDatedExams = result1.filter((exam) => {
              const examDate = new Date(exam.date);

              if (
                new Date(examDate.getTime() + exam.duration * 60000) <
                Date.now()
              ) {
                return true;
              }
            });
            res.status(200);
            res.json(outDatedExams);
          })
          .catch((err) => {
            res.json(err);
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
const exam_by_id = (req, res) => {
  Exam.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  exam_create,
  exam_list_by_student_id,
  exam_list_by_teacher_id,
  exam_all_get,
  exam_list_active_student_id,
  exam_list_outdated_student_id,
  exam_by_id,
};
