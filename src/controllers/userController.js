// Controller for api when searching users
const User = require('../models/userModel');
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var secret = 'tosisecret';
const saltRounds = 12;

module.exports = {


    //TODO: Add every info to be added (email, number, etc)
    //TODO: Check that every required info exist)
    addUser(req,res){

      const userToBeAdded = req.body;

      if (req.body && req.body.name && req.body.password && req.body.role) {
        console.log('adding user');
    
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    
          var newUser = new User({
            name: xssFilters.inHTMLData(userToBeAdded.name),
            password: hash,
            role: xssFilters.inHTMLData(userToBeAdded.role)
          });

          console.log(newUser)

          newUser.save(function(err) {
            if (err) {
              res.sendStatus(500);
              return console.error(err);
            };

            console.log("Inserted new user");
    
            // Create token and return it
            jwt.sign({name:req.body.name},secret,{algorithm:'HS256'},function(err, token){
              res.json(token);
            });
          });
    
        });
      } else {
        res.sendStatus(400);
      }
    },

    async updateUser(req,res){
        // Something is wrong with this thing. It cant find with findById >,<
        const userUpdateInfo = req.body;
        console.log(userUpdateInfo);
          // Check that player exists, that is to be modified
        var updatedUser = await User.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

        updatedUser.name = userUpdateInfo.name;
        updatedUser.role = userUpdateInfo.role;
        updatedUser.password = userUpdateInfo.password;

        updatedUser.save();

        console.log(updatedUser);
        res.send(updatedUser);
    }

}
