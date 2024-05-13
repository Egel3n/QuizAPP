import { useState, useEffect } from "react";
import ExamList from "./ExamList";
import TeacherExams from "./TeacherExams";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import { useCookies } from "react-cookie";

const Home = () => {
  const { auth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  const {
    data: teacherExams,
    isPending,
    error,
  } = useFetch("/exam/teacher/" + cookies.userID);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {teacherExams && (
        <TeacherExams
          exams={teacherExams}
          title="Active Exams"
          classType="activeExamList"
        />
      )}
    </div>
  );
};

export default Home;
