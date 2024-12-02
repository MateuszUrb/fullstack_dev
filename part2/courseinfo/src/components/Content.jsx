function Content({ course }) {
  const sumOfPartsExercises = course.parts;
  const sum = sumOfPartsExercises.reduce(
    (sum, course) => sum + course.exercises,
    0,
  );
  return (
    <>
      {course.parts.map((info) => (
        <Part key={info.id} info={info} />
      ))}
      <p>total of {sum} exercises</p>
    </>
  );
}

function Part({ info }) {
  return (
    <>
      <p>
        {info.name} {info.exercises}
      </p>
    </>
  );
}

export default Content;
