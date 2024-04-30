import { useState, useEffect } from "react";
import ExamList from "./ExamList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: exams,
    isPending,
    error,
  } = useFetch("http://localhost:8000/exams");

  const {
    data: userExams,
    isPendings,
    errors,
  } = useFetch("http://localhost:8000/userExam?studentID=" + 1);

  const [activeExams, setActiveAExams] = useState(null);
  const [outdatedExams, setOutdatedExams] = useState(null);

  useEffect(() => {
    exams &&
      setActiveAExams(
        userExams &&
          exams.filter((exam) => {
            const userExam = userExams.filter((ue) => {
              if (ue.examID == exam.id) {
                return true;
              }
              return false;
            });
            let examDate = Date.parse(exam.startDate);
            if (examDate > currentDate && userExam[0].active == 1) {
              return true;
            } else {
              return false;
            }
          })
      );

    exams &&
      setOutdatedExams(
        userExams &&
          exams.filter((exam) => {
            const userExam = userExams.filter((ue) => {
              if (ue.examID == exam.id) {
                return true;
              }
              return false;
            });
            let examDate = Date.parse(exam.startDate);
            if (examDate < currentDate || userExam[0].active == 0) {
              return true;
            } else {
              return false;
            }
          })
      );
  });

  const currentDate = Date.now();

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {exams && (
        <ExamList
          exams={activeExams}
          title="Active Exams"
          classType="activeExamList"
        />
      )}
      {exams && (
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
