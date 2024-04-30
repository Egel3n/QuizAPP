import { useParams } from "react-router-dom";

const ExamCompleted = () => {
  const { point } = useParams();

  return (
    <div className="exam-completed">
      <h2>You Have Completed The Exam</h2>
      <h3>Your Score is {point}</h3>
    </div>
  );
};

export default ExamCompleted;
