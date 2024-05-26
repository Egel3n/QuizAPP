import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./api/axios";

const QuestionCreate = () => {
  const [questionString, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [index, setIndex] = useState(1);

  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  const { examID, questionCount } = useParams();

  function clearForm() {
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setQuestion("");
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
    const questionObject = {
      examID,
      questionString,
      optionA,
      optionB,
      optionC,
      optionD,
      index,
    };

    setIsPending(true);
    //   fetch("http://localhost:3500/question/create", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: questionObject,
    //   }).then(() => {
    //     console.log("new question added");
    //     setIsPending(false);
    //     setIndex(index + 1);
    //     clearForm();
    //   });
    // };
    const response = await axios.post("/question/create", questionObject);
    setIsPending(false);
    setIndex(index + 1);
    clearForm();
  };

  useEffect(() => {
    if (index > questionCount) {
      history("/examcreated");
    }
  });

  return (
    <div className="create">
      <h4>Question {index}</h4>
      <form>
        <label>Question:</label>
        <textarea
          value={questionString}
          onChange={(e) => setQuestion(e.target.value)}
          required
        ></textarea>
        <label>Option A :</label>
        <input
          type="text"
          required
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
        />
        <label>Option B :</label>
        <input
          type="text"
          required
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
        />
        <label>Option C :</label>
        <input
          type="text"
          required
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
        />
        <label>Option D :</label>
        <input
          type="text"
          required
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
        />

        {!isPending && <button onClick={handleSumbit}>Add Question</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default QuestionCreate;
