import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [wait, setWait] = useState(true);
  const {
    data: exam,
    isPending,
    error,
  } = useFetch("http://localhost:8000/exams/" + id);
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/exam/" + id);
  };

  async function isExamStarted() {
    const globalDate = await axios.get(
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Istanbul"
    );
    const currentDate = new Date(globalDate.data.dateTime);
    const examDate = new Date(exam.startDate);

    if (currentDate.getTime() >= examDate.getTime()) {
      setWait(false);
    }
  }

  useEffect(() => {
    exam && isExamStarted();
  });

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {exam && (
        <article>
          <h2>{exam.examName}</h2>
          <p>Date 📅: {exam.startDate}</p>
          <p>Duration 🕛: {exam.duration}</p>
          <p>
            Question Count:{" "}
            <span className="questionNumber">{exam.questionNumber}</span>
          </p>

          {!wait && <button onClick={handleClick}>JOIN</button>}
          {wait && (
            <button disabled style={{ background: "#383838" }}>
              JOIN
            </button>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
