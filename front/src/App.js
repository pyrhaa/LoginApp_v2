import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const baseUrl = '/api/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newIdentity, setNewIdentity] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [filter, setFilter] = useState('');

  //get retourne promise
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // e.preventDefault() : annuler le refresh de la page au moment du clic
  //addNewPerson test if we have a doublon or else create the new person
  const addNewPerson = (e) => {
    e.preventDefault();
    const doublon = persons.filter((person) =>
      person.identity.toLowerCase().includes(newIdentity.toLowerCase())
    );
    if (doublon.length) {
      if (window.confirm(`the account ${newIdentity} , already exist !`)) {
        const modifArray = [...persons];
        modifArray.forEach((person) => {
          if (person.identity === newIdentity) {
            person.password = newPassword;
          }
        });
        setPersons(modifArray);
        const newObj = { ...doublon[0] };
        axios
          .put(baseUrl + doublon[0].id, newObj)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const newPerson = {
        identity: newIdentity,
        password: newPassword,
        id: Math.floor(Math.random() * 1000000000000)
      };
      const newArray = persons.concat(newPerson);
      setPersons(newArray);
      // requete POST pour maj backend db.json
      axios
        .post(baseUrl, newPerson)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Verify if the login is valid
  const successLog =
    filter.length > 0
      ? persons.filter((person) =>
          person.identity.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Authentificator</h2>
      <h3>Sign up</h3>
      <PersonForm
        setNewIdentity={setNewIdentity}
        setNewPassword={setNewPassword}
        addNewPerson={addNewPerson}
      />
      <h2>Sign in</h2>
      <Filter setFilter={setFilter} successLog={successLog} />
    </div>
  );
};

export default App;
