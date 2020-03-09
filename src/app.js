const api = require('./routes/api');
const express = require('express');

const app = express();


const port = 3000

/*
app.get('/', (req, res) => {
  res.send(api);
});

*/

app.use("/api", api);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

  console.log(`App listening on port ${port}!`);
});
