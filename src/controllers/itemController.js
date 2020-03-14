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
    },

    async updateItem(req,res){
        const itemUpdateInfo = req.body;
        console.log(itemUpdateInfo);
          // Check that player exists, that is to be modified
        var updatedItem = await Item.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

        updatedItem.price = itemUpdateInfo.price;
        updatedItem.description = itemUpdateInfo.description;

        updatedItem.save();
        
        console.log(updatedItem);
        res.send(updatedItem);
    },

    async deleteItem(req,res){

        const itemToBeDeleted = await Item.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

        Item.findByIdAndDelete(req.params.id).exec();

        res.send(itemToBeDeleted);
    },

    deleteAllItems(req,res){
        Item.deleteMany({}, function(err){
            if(err){
                return err;
            }else{
                console.log("Removed all items successfully!");
            }
            res.send({});
        });
    },

    async getSingleItem(req,res){

        var fetchedItem = await Item.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});
        
        res.send(fetchedItem);
    },

    async getAllItems(req,res){

        var fetchedItems = await Item.find().exec()
            .catch(function(error){return 'Error occured'});
        res.send(fetchedItems);
    }
}