const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.get("/all", teacherController.teachers_get); // Get All Teacher
router.post("/create", teacherController.teacher_create); //Create Teacher
router.get("/:id", teacherController.teacher_by_id);

module.exports = router;
