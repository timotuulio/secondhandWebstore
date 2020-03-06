//import api from 'asd.js'/*'/routes/api.js'*/;
const api = require('asd.js');
const express = require('express');

const app = express();

const port = 3000

app.get('/', (req, res) => {
  res.send(api);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
