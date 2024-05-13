import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import axios from "axios";
import myAxios from "./api/axios";
import { useCookies } from "react-cookie";

const Exam = () => {
  const { id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState("");
  const [answer, setAnswer] = useState("");
  const [date, setDate] = useState(null);

  let [body, setBody] = useState(null);
  const history = useNavigate();

  const {
    data: question,
    isPending,
    error,
  } = useFetch("/question/exam/" + id + "/" + questionNumber);

  const { data: exam, isPendingExam, errorExam } = useFetch("/exam/find/" + id);

  function evaluateGrade(examAnswers, userAnswers) {
    let grade = 0;
    for (let index = 0; index < examAnswers.length; index++) {
      if (examAnswers[index] === userAnswers[index]) {
        grade += 100 / examAnswers.length;
      }
    }
    return grade;
  }

  async function checkExamOver(examAnswers, userAnswers) {
    if (examAnswers.length == userAnswers.length) {
      const score = evaluateGrade(userAnswers, examAnswers);
      const updateObject = { userid: cookies.userID, examid: id, score };
      const response = await myAxios.put("/studentexam", updateObject);
      console.log(response);
      history("/completed/" + evaluateGrade(userAnswers, examAnswers));
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    setAnswers(answers + answer);
    setQuestionNumber(questionNumber + 1);
  };

  async function GetCurrentDate() {
    const globalDate = await axios.get(
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Istanbul"
    );

    let examDate = new Date(exam.date);
    let finishDate = new Date(examDate.getTime() + exam.duration * 60000);
    let currentDate = new Date(globalDate.data.dateTime);
    let distance = finishDate.getTime() - currentDate.getTime();
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setDate(hours + "h " + minutes + "m " + seconds + "s ");
  }

  useEffect(() => {
    answers && checkExamOver(exam.answerKey, answers);
  }, [answers]);

  useEffect(() => {
    const interval = setInterval(() => {
      exam && GetCurrentDate();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="main-exam-frame">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {question && (
        <div className="exam-frame">
          {date && (
            <div className="counter">
              <h3>{date}</h3>
            </div>
          )}
          {
            <div className="questionFrame">
              <h4>Question {questionNumber}</h4>
              <p>{question.questionString}</p>
              <form onSubmit={handleClick}>
                <div className="option">
                  <input
                    type="radio"
                    name="options"
                    id="optionA"
                    value={"A"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />

                  <label htmlFor="optionA"> A) {question.optionA}</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    name="options"
                    id="optionB"
                    value={"B"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label htmlFor="optionB"> B) {question.optionB}</label>
                </div>
                <div className="option">
                  <input
                    type="radio"
                    name="options"
                    id="optionC"
                    value={"C"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label htmlFor="optionC"> C) {question.optionC}</label>
                </div>
                <div className="option">
                  <input
                    type="radio"
                    name="options"
                    id="optionD"
                    value={"D"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label htmlFor="optionD"> D) {question.optionD}</label>
                </div>
                <button type="submit"> Next Question</button>
              </form>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Exam;
