import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
}

function create(newPerson) {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
}

function remove(id) {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
}

function update(person, newNumber) {
  const req = axios.put(`${baseUrl}/${person.id}`, {
    id: person.id,
    name: person.name,
    number: newNumber,
  });
  return req.then((res) => res.data);
}

export default {
  getAll,
  create,
  remove,
  update,
};
