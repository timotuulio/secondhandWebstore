const api = require('./routes/api');
const express = require('express');

// connect to database
const db = require('./models/db');
db.connectDB();

const app = express();
app.use(express.static('../public'));

const port = 3000

app.use("/api", api);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
