import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Welcome = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  return (
    <div>
      <h1>
        {" "}
        WELCOME TO EXAM.COM, DEAR{" "}
        <span style={{ color: "#f1356d" }}>
          {cookies?.name.toUpperCase()}
        </span>{" "}
        !
      </h1>
      {cookies.role === "student" ? (
        <h3 style={{ margin: 30 }}>
          {" "}
          Let's check your <Link to="/exams">EXAMS</Link>{" "}
        </h3>
      ) : null}
      {cookies.role === "teacher" ? (
        <h2 style={{ margin: 30 }}>
          {" "}
          Let's check your <Link to="/teacherexams">Students</Link> or Create a
          new <Link to="create">EXAM</Link>{" "}
        </h2>
      ) : null}
    </div>
  );
};

export default Welcome;
