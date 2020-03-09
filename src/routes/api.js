const express = require('express');

const app = express();

app.get('/api', (req, res) => {res.send("This is api");});

app.get('/api/user', (req, res) => {res.send("GET: This is all users");});
app.post('/api/user', (req, res) => {res.send("POST: This is all users");});
app.put('/api/user', (req, res) => {res.send("PUT: This is all users");});
app.delete('/api/user', (req, res) => {res.send("DELETE: This is all users");});

app.get('/api/user/:id', (req, res) => {res.send("GET: This is single user");});
app.post('/api/user/:id', (req, res) => {res.send("POST: This is single user");});
app.put('/api/user/:id', (req, res) => {res.send("PUT: This is single user");});
app.delete('/api/user/:id', (req, res) => {res.send("DELETE: This is single user");});

app.get('/api/item', (req, res) => {res.send("GET: This is items");});
app.post('/api/item', (req, res) => {res.send("POST: This is items");});
app.put('/api/item', (req, res) => {res.send("PUT: This is items");});
app.delete('/api/item', (req, res) => {res.send("DELETE: This is items");});

app.get('/api/item/:id', (req, res) => {res.send("GET: This is single item");});
app.post('/api/item/:id', (req, res) => {res.send("POST: This is single item");});
app.put('/api/item/:id', (req, res) => {res.send("PUT: This is single item");});
app.delete('/api/item/:id', (req, res) => {res.send("DELETE: This is single item");});

app.get('/api/itemsofusers', (req, res) => {res.send("GET: This is list of users with items");});
app.post('/api/itemsofusers', (req, res) => {res.send("POST: This is list of users with items");});
app.put('/api/itemsofusers', (req, res) => {res.send("PUT: This is list of users with items");});
app.delete('/api/itemsofusers', (req, res) => {res.send("DELETE: This is list of users with items");});

app.get('/api/itemsofusers/:id', (req, res) =>  {res.send("GET: This is list of a certain users items");});
app.post('/api/itemsofusers/:id', (req, res) =>  {res.send("POST: This is list of a certain users items");});
app.put('/api/itemsofusers/:id', (req, res) =>  {res.send("PUT: This is list of a certain users items");});
app.delete('/api/itemsofusers/:id', (req, res) =>  {res.send("DELETE: This is list of a certain users items");});

module.exports = app;
