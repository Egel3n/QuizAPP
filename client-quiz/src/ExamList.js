import { Link } from "react-router-dom";

const BlogList = ({ exams, title, classType }) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {exams &&
        exams.map((exam) => (
          <div className={classType} key={exam.id}>
            <Link to={`/exams/${exam.id}`}>
              <h2>{exam.examName}</h2>
              <p>⏲️: {exam.startDate}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
