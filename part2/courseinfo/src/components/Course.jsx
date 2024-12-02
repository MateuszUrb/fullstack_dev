import Header from "./Header.jsx";
import Content from "./Content.jsx";

function Course({ course }) {
  return (
    <div>
      {" "}
      <Header course={course} />
      <Content key={course.id} course={course} />
    </div>
  );
}

export default Course;
