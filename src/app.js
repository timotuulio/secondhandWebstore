const api = require('./routes/api');
const express = require('express');

// connect to database
const db = require('./models/db');
db.connectDB();

const app = express();


const port = 3000

app.use("/api", api);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
