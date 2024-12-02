function Header({ course }) {
  return (
    <>
      <h2 key={course.id}>{course.name}</h2>
    </>
  );
}

export default Header;
