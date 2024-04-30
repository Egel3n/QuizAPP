const express = require("express");
const userExamController = require("../controllers/studentExamController");
const router = express.Router();

router.post("/create", userExamController.studentExam_create);
router.get("/find/:studentID/:examID", userExamController.studentExam_isActive);

module.exports = router;
