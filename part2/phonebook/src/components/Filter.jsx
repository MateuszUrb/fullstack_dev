function Filter({ filter, handleFilterPersons }) {
  return (
    <div>
      filter show with :{" "}
      <input type="text" value={filter} onChange={handleFilterPersons} />
    </div>
  );
}

export default Filter;
