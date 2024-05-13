import { useState, useEffect } from "react";
import ExamList from "./ExamList";
import TeacherExams from "./TeacherExams";
import StudetList from "./StudentList";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import StudentList from "./StudentList";

const Home = () => {
  const { auth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  const { id } = useParams();
  const {
    data: students,
    isPending,
    error,
  } = useFetch("/studentexam/exam/" + id);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {students && (
        <StudentList
          exams={students}
          title="Students"
          classType="activeExamList"
        />
      )}
    </div>
  );
};

export default Home;
