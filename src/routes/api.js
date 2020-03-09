
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

//router.get('/', );
//router.get('/:id([a-f0-9]{24})', QuestionnaireController.show);

router.get('/keke',itemController.addItem);

var api = "moi kaikki";

module.exports = router;
