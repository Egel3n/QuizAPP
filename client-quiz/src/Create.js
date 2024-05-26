import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "./api/axios";
const Create = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["teacherID"]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(cookies.userID);
    setIsPending(true);
    if (answerKey.length != questionCount) {
      window.prompt("Question count and answer key count must be same ");
      return;
    }

    const teacherID = cookies.userID;
    const exam = { title, date, duration, answerKey, teacherID, questionCount };

    // await fetch("http://localhost:3500/exam/create", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(exam),
    // }).then((result) => {
    //   console.log(result.body);
    //   setIsPending(false);
    //   history("/questionCreate/" + result.body._id + "/" + questionCount);
    // });
    try {
      const response = await axios.post("/exam/create", exam, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsPending(false);
      history("/questionCreate/" + response?.data._id + "/" + questionCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create">
      <h1>Add a New Quiz</h1>
      <form>
        <label>Quiz Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Quiz Date:</label>
        <input
          type="datetime-local"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Duration (min.):</label>
        <input
          type="number"
          min="0"
          step="1"
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label>Question Count:</label>
        <input
          type="number"
          min="0"
          step="1"
          required
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
        />
        <label>Answer Keys:</label>
        <input
          type="text"
          required
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
        />
        {!isPending && <button onClick={handleSumbit}>Next</button>}
        {isPending && <button disabled> Next</button>}
      </form>
    </div>
  );
};

export default Create;
