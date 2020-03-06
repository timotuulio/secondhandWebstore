const api = require('./routes/api.js');
const express = require('express');

const app = express();

const port = 3000

// app.get('/', (req, res) => {
//   res.send(api);
// });

api.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
