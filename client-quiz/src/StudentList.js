import axios from "axios";
import { useEffect, useState } from "react";

const StudentList = () => {
  const [StudentList, setStudentList] = useState(null);

  async function getStudentList() {
    const StudentList = await axios.get("http://localhost:8000/Student");
    console.log(StudentList);
    setStudentList(StudentList.data);
  }

  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <div className="StudentList">
      {StudentList &&
        StudentList.map((student) => (
          <div className="student-result">
            <p>No: {student.studentID}</p>
            <p>Name: {student.name}</p>
            <p>Result: {student.result}</p>
          </div>
        ))}
    </div>
  );
};

export default StudentList;
