import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import myAxios from "./api/axios";
import { useCookies } from "react-cookie";

const BlogDetails = () => {
  const { id } = useParams();
  const [wait, setWait] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [cookies] = useCookies(["userID"]);
  const { data: exam, isPending, error } = useFetch("/exam/find/" + id);

  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/exam/" + id);
  };

  async function isExamStarted() {
    const globalDate = await axios.get(
      "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Istanbul"
    );
    const currentDate = new Date(globalDate.data.dateTime);
    const examDate = new Date(exam.date);
    const response = await myAxios.get(
      "/studentexam/find/" + cookies.userID + "/" + id
    );
    console.log(response);
    if (response.data.active) {
      setIsActive(true);
    }
    if (currentDate.getTime() >= examDate.getTime()) {
      setWait(false);
      console.log("isActive = " + isActive);
    }
  }

  useEffect(() => {
    exam && isExamStarted();
    console.log(exam);
  });

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {exam && (
        <article>
          <h2>{exam.title}</h2>
          <p>Date 📅: {exam.date}</p>
          <p>Duration 🕛: {exam.duration}</p>
          <p>
            Question Count:{" "}
            <span className="questionNumber">{exam.questionCount}</span>
          </p>

          {!wait && isActive && <button onClick={handleClick}>JOIN</button>}
          {wait && isActive && (
            <button disabled style={{ background: "#383838" }}>
              Not Started
            </button>
          )}
          {!isActive && (
            <button disabled style={{ background: "#383838" }}>
              Already Completed
            </button>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
