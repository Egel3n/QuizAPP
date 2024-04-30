import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    setIsPending(true);
    if (answerKey.length != questionCount) {
      window.prompt("Question count and answer key count must be same ");
      return;
    }
    let id = crypto.randomUUID();
    const exam = { id, title, date, duration, answerKey };

    fetch("http://localhost:8000/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exam),
    }).then(() => {
      setIsPending(false);
      history("/questionCreate/" + id + "/" + questionCount);
    });
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
          type="date"
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
