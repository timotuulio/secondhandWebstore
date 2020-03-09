const api = require('./routes/api');
const express = require('express');

// connect to database
const db = require('./models/db');
db.connectDB();

const app = express();


const port = 3000

app.use("/api", api);
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
=======
>>>>>>> f2b1178c89fcc88493cad5dccb7c307ea74c98c7

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
