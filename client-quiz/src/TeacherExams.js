import { Link } from "react-router-dom";

const BlogList = ({ exams, title, classType }) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {exams &&
        exams.map((exam) => (
          <div className={classType} key={exam._id}>
            <Link to={`/teacherexams/${exam._id}`}>
              <h2>{exam.title}</h2>
              <p>⏲️: {exam.date}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
