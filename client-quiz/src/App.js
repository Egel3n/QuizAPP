import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import NotFound from "./NotFound";
import ExamDetails from "./ExamDetails";
import Exam from "./Exam";
import ExamCompleted from "./ExamCompleted";
import StudentListPage from "./StudentListPage";
import TeacherExamPage from "./TeacherExamsPage";
import QuestionCreate from "./QuestionCreate";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import StudentList from "./StudentList";
import PersistLogin from "./PersistLogin";
import Logout from "./Logout";
import { useCookies } from "react-cookie";
import Welcome from "./Welcome";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route Component={PersistLogin}>
              <Route path="/" Component={cookies?.name ? Welcome : Login} />
              <Route path="/exams" Component={Home} />
              <Route path="/create" Component={Create} />
              <Route path="/exams/:id" Component={ExamDetails} />
              <Route path="/exam/:id" Component={Exam} />
              <Route path="/completed/:point" Component={ExamCompleted} />
              <Route
                path="/questionCreate/:examID/:questionCount"
                Component={QuestionCreate}
              />
            </Route>
            <Route path="/register" Component={Register} />
            <Route path="/TeacherExams" Component={TeacherExamPage} />
            <Route path="/teacherexams/:id" Component={StudentListPage} />
            <Route path="/logout" Component={Logout} />

            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
