import { useState, useEffect } from "react";
import ExamList from "./ExamList";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import { useCookies } from "react-cookie";

const Home = () => {
  const { auth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  const {
    data: exams,
    isPending,
    error,
  } = useFetch("/exam/active/" + cookies.userID);

  const {
    data: userExams,
    isPendings,
    errors,
  } = useFetch("/exam/outdated/" + cookies.userID);

  const [activeExams, setActiveAExams] = useState(null);
  const [outdatedExams, setOutdatedExams] = useState(null);

  useEffect(() => {
    exams && setActiveAExams(exams);

    console.log(cookies);

    userExams && setOutdatedExams(userExams);
  });

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {errors && <div>{errors}</div>}
      {isPendings && <div>Loading...</div>}

      {activeExams && (
        <ExamList
          exams={activeExams}
          title="Active Exams"
          classType="activeExamList"
        />
      )}
      {outdatedExams && (
        <ExamList
          exams={outdatedExams}
          title="Outdated Exams"
          classType="outdatedExamList"
        />
      )}
    </div>
  );
};

export default Home;
