import axios from "axios";
import { useEffect, useState } from "react";

const StudentList = ({ exams, title, classType }) => {
  console.log(exams);
  return (
    <div className="StudentList">
      {exams &&
        exams.map((student) => (
          <div className="student-result">
            <p>No: {student.studentID}</p>
            <p>Name: {student.studentName}</p>
            <p>Result: {student.result}</p>
          </div>
        ))}
    </div>
  );
};

export default StudentList;
