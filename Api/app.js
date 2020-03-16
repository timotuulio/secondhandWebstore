const api = require('./routes/api');
const express = require('express');

// connect to database
const db = require('./models/db');
db.connectDB();

const app = express();

var cors = require('cors');


app.use(cors());

const port = 3001;

app.use("/api", api);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
