import { useMemo } from "react";

function Nubmers({ persons, filter, removeUser }) {
  const filterResult = useMemo(() => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [persons, filter]);

  return (
    <div>
      <ul>
        {filterResult.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removeUser(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nubmers;
