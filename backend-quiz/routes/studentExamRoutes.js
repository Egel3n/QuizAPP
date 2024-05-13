const express = require("express");
const userExamController = require("../controllers/studentExamController");
const router = express.Router();

router.post("/create", userExamController.studentExam_create);
router.get("/find/:studentID/:examID", userExamController.studentExam_isActive);
router.get("/exam/:id", userExamController.students_by_examID);
router.put("/", userExamController.studentExam_update);

module.exports = router;
