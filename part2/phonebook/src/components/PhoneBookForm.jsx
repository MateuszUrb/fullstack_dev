function PhoneBookForm({
  onSubmit,
  handleNumberInput,
  handleNameInput,
  number,
  newName,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:{" "}
        <input type="text" value={number} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
export default PhoneBookForm;
