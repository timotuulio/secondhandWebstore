//<<<<<<< HEAD

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/api', (req, res) => {res.send("This is api");});

router.get('/user', (req, res) => {res.send("GET: This is all users");});
router.post('/user', (req, res) => {res.send("POST: This is all users");});
router.put('/user', (req, res) => {res.send("PUT: This is all users");});
router.delete('/user', (req, res) => {res.send("DELETE: This is all users");});

router.get('/user/:id', (req, res) => {res.send("GET: This is single user");});
router.post('/user/:id', (req, res) => {res.send("POST: This is single user");});
router.put('/user/:id', (req, res) => {res.send("PUT: This is single user");});
router.delete('/user/:id', (req, res) => {res.send("DELETE: This is single user");});

router.get('/item', (req, res) => {res.send("GET: This is items");});
router.post('/item', itemController.addItem);
router.delete('/item', itemController.deleteAllItems);

router.get('/item/:id', (req, res) => {res.send("GET: This is single item");});
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);

router.get('/itemsofusers', (req, res) => {res.send("GET: This is list of users with items");});
router.post('/itemsofusers', (req, res) => {res.send("POST: This is list of users with items");});
router.put('/itemsofusers', (req, res) => {res.send("PUT: This is list of users with items");});
router.delete('/itemsofusers', (req, res) => {res.send("DELETE: This is list of users with items");});

router.get('/itemsofusers/:id', (req, res) =>  {res.send("GET: This is list of a certain users items");});
router.post('/itemsofusers/:id', (req, res) =>  {res.send("POST: This is list of a certain users items");});
router.put('/itemsofusers/:id', (req, res) =>  {res.send("PUT: This is list of a certain users items");});
router.delete('/itemsofusers/:id', (req, res) =>  {res.send("DELETE: This is list of a certain users items");});


router.get('/test', testItem);

function testItem(req, res) {
  res.send("Api.js testItem funktiossa ollaan");
}

module.exports = router;
