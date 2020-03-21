// Controller for items for when api calls are used for items

const Item = require('../models/itemModel');
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var secret = 'tosisecret';


// This will authenticate token
function authToken(tokenAuth){

    var authed = false;

    if(!tokenAuth){

        // No header 
    
    }else if(tokenAuth.startsWith('Bearer' )){

        var token = tokenAuth.slice(7,tokenAuth.length);
        console.log(token)
    
        jwt.verify(token,secret, function(err,decoded){
            if(err){
                console.log("invalid token");
            }else{
                authed = true;
                console.log('authenticated');
            }
        });
    }
    return authed;
  }
  


module.exports = {

    addItem(req,res){


        if(authToken(req.headers.authorization)){
            const itemToBeAdded = req.body;

            newItem = new Item();

            // Check that the added data has required properties
            if('title' in itemToBeAdded && 'price' in itemToBeAdded && 'ownerId' in itemToBeAdded){

                
                newItem.price = xssFilters.inHTMLData(itemToBeAdded.price);
                newItem.title = xssFilters.inHTMLData(itemToBeAdded.title);
                newItem.description = xssFilters.inHTMLData(itemToBeAdded.description);
                newItem.ownerId = itemToBeAdded.ownerId;
                newItem.created = xssFilters.inHTMLData(itemToBeAdded.created);

                // This was an attempt to add an image
                //newItem.img.data = fs.readFileSync(itemToBeAdded.image);
                //newItem.img.contentType = 'image/png';
        
                newItem.save(function(err){
                    if(err){
                        res.send(err)
                    }else{
                        console.log("Item "+newItem.title+" added.");
                        res.send({});
                    }
                });
                
            
            // In case there are no required fields, give bad request
            }else{
                res.statusCode = 400;
                res.send("Check the required fields");
            }

            console.log(itemToBeAdded);

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }

        
       
    },

    async updateItem(req,res){

        if(authToken(req.headers.authorization)){
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

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }



        
    },

    async deleteItem(req,res){

        if(authToken(req.headers.authorization)){
            const itemToBeDeleted = await Item.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

            Item.findByIdAndDelete(req.params.id).exec();

            res.send(itemToBeDeleted);

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }


       
    },

    deleteAllItems(req,res){

        if(authToken(req.headers.authorization)){
            Item.deleteMany({}, function(err){
                if(err){
                    return err;
                }else{
                    console.log("Removed all items successfully!");
                }
                res.send({});
            });

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }
        
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
    },

    // Fetches useritems
    async getOfferedItems(req,res){

        var offeredItems = await Item.find({ ownerId: req.params.id }).exec()
            .catch(function(error){return 'Error occured'});
       
        res.send(offeredItems);
    }
}
