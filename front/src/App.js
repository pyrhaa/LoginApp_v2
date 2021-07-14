import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const baseUrl = '/api/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newIdentity, setNewIdentity] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userIdentity, setUserIdentity] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
  const addNewUser = (e) => {
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
      // requete POST pour maj backend
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
  const successLog = (e) => {
    e.preventDefault();
    const user = persons.find(
      (el) => el.identity === userIdentity && el.password === userPassword
    );
    if (user) {
      console.log('success');
      window.alert(`Welcome ${user.identity}`);
    } else {
      console.log('fail');
    }
  };

  return (
    <div>
      <h2>Authentificator</h2>
      <h3>Sign up</h3>
      <PersonForm
        setNewIdentity={setNewIdentity}
        setNewPassword={setNewPassword}
        addNewUser={addNewUser}
      />
      <h2>Sign in</h2>
      <Filter
        setUserIdentity={setUserIdentity}
        setUserPassword={setUserPassword}
        successLog={successLog}
      />
    </div>
  );
};

export default App;
