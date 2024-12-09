import { useState, useEffect } from "react";
import personsService from "./services/person";
import Notification from "./components/Notification";

import PhoneBookForm from "./components/PhoneBookForm";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";

function App() {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });

  function handleNameInput(e) {
    setNewName(e.target.value);
  }
  function handleNumberInput(e) {
    setNumber(e.target.value);
  }

  function handleFilterPersons(e) {
    setFilter(e.target.value);
  }

  function removeUser(id) {
    const person = persons.find((person) => person.id === id);
    if (!person) return;
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then(({ id }) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
      setNotification({
        type: "info",
        message: `${person.name} successfully removed`,
      });
      setTimeout(() => {
        setNotification({ type: "", message: null });
      }, 3000);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const id = newName.length + number;
    const isNameInPersons = persons.some((person) => person.name === newName);
    const getNameInPersons = persons.find((person) => person.name === newName);

    const newPerson = {
      id,
      name: newName,
      number,
    };

    if (!isNaN(+newName)) {
      alert("please use letters for name and nubmers for number");
      setNewName("");
      setNumber("");
      return;
    }
    if (newName === "" || number === "") return;

    if (!isNameInPersons) {
      personsService.create(newPerson).then((returendPersons) => {
        setPersons([...persons, returendPersons]);
        setNewName("");
        setNumber("");
      });
      setNotification({ type: "info", message: `Added ${newName}` });
      setTimeout(() => {
        setNotification({ type: "", message: null });
      }, 3000);
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personsService
          .update(getNameInPersons, number)
          .then((res) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === res.id ? { ...person, ...res } : person,
              ),
            );
          })
          .catch((error) => {
            setNotification({
              type: "error",
              message: `Information of ${getNameInPersons.name} has already been removed from server`,
            });
            console.log(error.message);
          });

        setNotification({
          type: "info",
          message: `Number for ${getNameInPersons.name} changed`,
        });
        setTimeout(() => {
          setNotification({ type: "", message: null });
        }, 3000);
        setNewName("");
        setNumber("");
      }
    }
  }

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  if (!persons) {
    return null;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Filter filter={filter} handleFilterPersons={handleFilterPersons} />
      <h3>add new</h3>
      <PhoneBookForm
        newName={newName}
        number={number}
        onSubmit={onSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={filter} removeUser={removeUser} />
    </div>
  );
}

export default App;
