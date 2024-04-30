import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Exam.com</h1>
      </Link>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/">Exams</Link>
        <Link to="/create">Exam Create</Link>
        <Link to="/register">User Create</Link>
      </div>
    </nav>
  );
};

export default Navbar;
