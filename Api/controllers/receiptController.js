const Item = require('../models/itemModel');
const User = require('../models/userModel')
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

    async createReceipt(req,res){
        console.log("creating receipt");
    },


    async getReceipts(req,res){
        console.log("getting all receipts");
    },

    async getUserReceipts(req,res){
        console.log("getting user receipts")
    }




  }








 