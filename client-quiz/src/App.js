import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import NotFound from "./NotFound";
import ExamDetails from "./ExamDetails";
import Exam from "./Exam";
import ExamCompleted from "./ExamCompleted";
import QuestionCreate from "./QuestionCreate";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import StudentList from "./StudentList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/create" Component={Create} />
            <Route path="/exams/:id" Component={ExamDetails} />
            <Route path="/exam/:id" Component={Exam} />
            <Route path="/completed/:point" Component={ExamCompleted} />
            <Route
              path="/questionCreate/:examID/:questionCount"
              Component={QuestionCreate}
            />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/ExamStudent" Component={StudentList} />

            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
