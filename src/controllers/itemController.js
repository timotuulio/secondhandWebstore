// Controller for items for when api calls are used for items

const Item = require('../models/itemModel');
const xssFilters = require('xss-filters');

module.exports = {

    addItem(req,res){

        const itemToBeAdded = req.body;
        console.log(itemToBeAdded);
        newItem = new Item();
        newItem.price = xssFilters.inHTMLData(itemToBeAdded.price);
        newItem.description = xssFilters.inHTMLData(itemToBeAdded.description);

        newItem.save();

        res.send(newItem);
    }

   

}