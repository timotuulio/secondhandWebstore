const express = require('express');

const app = express();

app.get('/api', (req, res) => {res.send("This is api");});

app.get('/api/user', (req, res) => {res.send("This is all users");});

app.get('/api/user/:id', (req, res) => {res.send("This is single user");});

app.get('/api/item', (req, res) => {res.send("This is items");});

app.get('/api/item/:id', (req, res) => {res.send("This is single item");});

app.get('/api/itemsofusers', (req, res) => {res.send("This is list of users with items");});

app.get('/api/itemsofusers/:id', (req, res) =>  {res.send("This is list of a certain users items");});

module.exports = app;
