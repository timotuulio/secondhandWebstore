// Controller for items for when api calls are used for items

const Item = require('../models/itemModel');
const User = require('../models/userModel');
const Receipt = require('../models/receiptModel');
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mongoose = require('mongoose');

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

            var newItem = new Item();

            // Check that the added data has required properties
            if('title' in itemToBeAdded && 'price' in itemToBeAdded && 'ownerId' in itemToBeAdded){


                newItem.price = xssFilters.inHTMLData(itemToBeAdded.price);
                newItem.title = xssFilters.inHTMLData(itemToBeAdded.title);
                newItem.description = xssFilters.inHTMLData(itemToBeAdded.description);
                newItem.ownerId = itemToBeAdded.ownerId;
                newItem.created = xssFilters.inHTMLData(itemToBeAdded.created);
                newItem.status = xssFilters.inHTMLData(itemToBeAdded.status);

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

            var updatedItem = await Item.findById(req.params.id).exec()
                .catch(function(error){return 'Error occured'});

            for (const [key, value] of Object.entries(itemUpdateInfo)) {
                updatedItem[key] = xssFilters.inHTMLData(value);
            }

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

        var offeredItems = await Item.find({ ownerId: req.params.id, status:"offered"}).exec()
            .catch(function(error){return 'Error occured'});

        res.send(offeredItems);
    },

    async getOffers(req,res){
        var offers = await Item.find({status:"offered"}).exec()
            .catch(function(error){return 'Error occured'});

        res.send(offers);
    },


    async transaction(req,res){
        console.log("enter transcation!")

        var itemID = req.body.itemID;
        var buyerID = req.body.buyerID;



        var item = await Item.findById(itemID).exec().catch(function(error){return 'Error occured'});

        var buyer = await User.findById(buyerID).exec().catch(function(error){return 'Error occured'});

        // User is buying
        if(item.ownerId === 'SHOP'){
            item.owner = buyerID;
            item.status = 'SOLD';

        // user is selling
        }else{
            var owner = await User.findById(item.ownerId).exec().catch(function(error){return 'Error occured'});

            item.ownerId = 'SHOP';
            item.status = 'SHOP_BOUGHT';

        }

        var date = new Date();

        var receipt = new Receipt();
        receipt.title = item.title;
        receipt.buyer = buyerID;
        receipt.seller = item.ownerId;
        receipt.amount = item.price;
        receipt.date = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();

        await receipt.save();


        await item.save();

        res.send(item)
    },

    async getStock(req,res){
        console.log("getting shop stock")

        var stock = await Item.find({status:"SHOP_BOUGHT"}).exec()
            .catch(function(error){return 'Error occured'});

        res.send(stock);

    },

    async getSales(req,res){
        console.log("getting shop stock")

        var stock = await Item.find({status:"sale"}).exec()
            .catch(function(error){return 'Error occuredddd'});

        res.send(stock);

    }

}
