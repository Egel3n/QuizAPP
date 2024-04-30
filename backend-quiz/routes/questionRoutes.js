const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router.get("/exam/:id", questionController.questions_by_examID); // get all questions belongs an exam
router.post("/create", questionController.question_create);

module.exports = router;
