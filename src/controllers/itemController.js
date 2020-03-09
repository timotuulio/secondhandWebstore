// Controller for items for when api calls are used for items

const Item = require('../models/itemModel');

module.exports = {

    addItem(req,res){

        const itemToBeAdded = req.body;

        res.send("moi");
    }

   

}