const Item = require('../models/itemModel');
const User = require('../models/userModel')
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mongoose = require('mongoose');
const Receipt = require('../models/receiptModel');

var secret = 'tosisecret';


// This will authenticate token
function authToken(tokenAuth) {

    var authed = false;

    if (!tokenAuth) {

        // No header

    } else if (tokenAuth.startsWith('Bearer')) {

        var token = tokenAuth.slice(7, tokenAuth.length);
        console.log(token)

        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                console.log("invalid token");
            } else {
                authed = true;
                console.log('authenticated');
            }
        });
    }
    return authed;
}


module.exports = {



    async getReceipts(req, res) {
        if (authToken(req.headers.authorization)) {
            console.log("getting all receipts");
        } else {
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }
    },

    async getUserReceipts(req, res) {
        console.log("getting user receipts");
        var fetchedReceipts = await Receipt.find({
                $or: [{
                    seller: req.params.id
                }, {
                    buyer: req.params.id
                }]
            }).exec()
            .catch(function(error) {
                return 'Error occured'
            });
        res.send(fetchedReceipts);
    },



    async deleteReceipts(req, res) {
        console.log("deleting receipts");
        Receipt.deleteMany({});
        res.send({});
    }

}
