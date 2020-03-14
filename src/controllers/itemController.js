// Controller for items for when api calls are used for items

const Item = require('../models/itemModel');
const xssFilters = require('xss-filters');

module.exports = {

    addItem(req,res){

        const itemToBeAdded = req.body;

        newItem = new Item();

        // Check that the added data has required properties
        if('title' in itemToBeAdded && 'description' in itemToBeAdded){

            
            newItem.price = xssFilters.inHTMLData(itemToBeAdded.price);
            newItem.title = xssFilters.inHTMLData(itemToBeAdded.title);
    
            newItem.save(function(err){
                if(err){
                    return handleError(err);
                }else{
                    console.log("Item "+newItem.title+" added.");
                    res.send(newItem);
                }
            });
            
        
        // In case there are no required fields, give bad request
        }else{
            res.statusCode = 400;
            res.send("Check the required fields");
        }

        console.log(itemToBeAdded);
       
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