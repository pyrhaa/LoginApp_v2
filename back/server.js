const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.static('build'));

app.use(express.json());
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :body'
  )
);

let authentic = [
  {
    id: 1,
    identity: 'Lucius Afulay',
    password: 'AzulAdrarAman22'
  },
  {
    id: 2,
    identity: 'Aglellu Boubaburd',
    password: 'Cochon0uDesprairi3'
  }
];

app.get('/', (req, res) => {
  res.send('<h1>bonjour monde</h1>');
});

app.get('/api/persons', (req, res) => {
  res.send(authentic);
});

app.get('/api/persons/:id', (req, res) => {
  const personId = req.params.id;
  const person = authentic.find((el) => el.id === Number(personId));
  if (person) {
    res.send(person);
  } else {
    res.send({ error: 'No Person with this ID' });
  }
});

app.get('/info', (req, res) => {
  const dateNow = new Date().toString();

  res.send(
    `<div>
      <p>Authentification info for ${authentic.length} people</p>
    </div>
    <div>
      <p>${dateNow}</p>
    </div>`
  );
});

app.delete('/api/persons/:id', (req, res) => {
  const personId = req.params.id;
  authentic = authentic.filter((el) => el.id !== Number(personId));
  res.status(204).end();
});

const generateId = () => {
  const maxId =
    authentic.length > 0 ? Math.max(...authentic.map((n) => n.id)) : 0;
  return maxId + 1;
};

///////////// POST request handler /////////////////

app.post('/api/persons', (req, res) => {
  if (!req.body.identity || !req.body.password) {
    return res
      .status(400)
      .send({ error: 'identity and/or password is required' });
  }

  const sameName = authentic.find(
    (el) => el.identity.toLowerCase() === req.body.identity.toLowerCase()
  );

  if (sameName) {
    return res.status(400).send({ error: 'identity must be unique' });
  }

  const newPerson = {
    id: generateId(),
    identity: req.body.identity,
    password: req.body.password
  };

  authentic = authentic.concat(newPerson);
  res.send(newPerson);
});

///////////// invalid url handler /////////////////

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

////////////////////////////////////////////////////

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
