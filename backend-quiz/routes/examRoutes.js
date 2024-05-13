const express = require("express");
const examController = require("../controllers/examController");
const router = express.Router();

router.post("/create", examController.exam_create);
router.get("/student/:id", examController.exam_list_by_student_id);
router.get("/find/:id", examController.exam_by_id);
router.get("/active/:id", examController.exam_list_active_student_id);
router.get("/outdated/:id", examController.exam_list_outdated_student_id);
router.get("/teacher/:id", examController.exam_list_by_teacher_id);
router.get("/all", examController.exam_all_get);

module.exports = router;
