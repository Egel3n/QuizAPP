const express = require("express");
const examController = require("../controllers/examController");
const router = express.Router();

router.post("/create", examController.exam_create);
router.get("/student/:id", examController.exam_list_by_student_id);
router.get("/teacher/:id", examController.exam_list_by_teacher_id);

module.exports = router;
