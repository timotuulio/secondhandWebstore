const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const receiptController = require('../controllers/receiptController');
const bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/api', (req, res) => {res.send("This is api");});

router.get('/user', userController.getAllUsers);
router.post('/user', userController.addUser);
router.delete('/user', userController.deleteAllUsers);

router.get('/user/:id', userController.getSingleUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.post('/login', userController.loginUser);

router.get('/item', itemController.getAllItems);
router.post('/item', itemController.addItem);
router.delete('/item', itemController.deleteAllItems);

router.get('/item/:id', itemController.getSingleItem);
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);

router.get('/items/offered/:id',itemController.getOfferedItems);
router.get('/items/offers', itemController.getOffers);
router.post('/buy/:id', itemController.transaction);

router.get('/items/stock', itemController.getStock);

router.get('/receipt', receiptController.getReceipts);
router.get('/receipt/:id',receiptController.getUserReceipts);
router.post('/receipt', receiptController.createReceipt);

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
