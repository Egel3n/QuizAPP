const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.get("/:username", studentController.student_by_username);
router.post("/create", studentController.student_create);
router.get("/teacher/:teacherID", studentController.students_by_teacher);

module.exports = router;
