function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

function Header({ course }) {
  return <h1>{course}</h1>;
}
function Content({ parts }) {
  return (
    <div>
      {parts.map(({ name, exercises }) => {
        return <Part key={name} name={name} exercises={exercises} />;
      })}
    </div>
  );
}
function Total({ parts }) {
  return (
    <p>
      Number of exercises {parts.reduce((sum, item) => item.exercises + sum, 0)}
    </p>
  );
}

function Part({ name, exercises }) {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
}

export default App;
