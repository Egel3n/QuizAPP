import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const { auth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Exam.com</h1>
      </Link>
      <div className="links">
        {cookies?.name ? null : <Link to="/">Login</Link>}
        {cookies?.role === "student" ? <Link to="/exams">Exams</Link> : null}
        {cookies?.role === "teacher" ? (
          <Link to="/TeacherExams">Exams</Link>
        ) : null}

        {cookies?.role === "teacher" ? (
          <Link to="/create">Exam Create</Link>
        ) : null}
        {cookies.role === "admin" ? (
          <Link to="/register">User Create</Link>
        ) : null}
        {cookies.name ? (
          <Link className="navbar-hello" style={{ color: "#f1356d" }}>
            Hello, {cookies.name}
          </Link>
        ) : null}
        {cookies.name ? <Link to={"/logout"}> Logout</Link> : null}
      </div>
    </nav>
  );
};

export default Navbar;
