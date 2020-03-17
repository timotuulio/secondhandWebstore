// Controller for api when searching users
const User = require('../models/userModel');
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var secret = 'tosisecret';

const saltRounds = 12;


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


    //TODO: Add every info to be added (email, number, etc)
    //TODO: Check that every required info exist)
    addUser(req,res){

      const userToBeAdded = req.body;
      console.log("adduser");
      if (req.body && req.body.name && req.body.password) {
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
            console.log("This is ID:" + newUser._id)
            // Create token and return it
            jwt.sign({name:newUser._id},secret,{algorithm:'HS256'},function(err, token){
              res.json(token);
            });
          });

        });
      } else {
        res.sendStatus(400);
      }
    },

    async updateUser(req,res){

        //console.log(authenticate(req.headers.authorization))

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
    },

    async deleteUser(req,res){

        if(authToken(req.headers.authorization)){

            const userToBeDeleted = await User.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

            User.findByIdAndDelete(req.params.id).exec();

            res.send(userToBeDeleted);

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }

       
    },

    deleteAllUsers(req,res){

      if(authToken(req.headers.authorization)){
        User.deleteMany({}, function(err){
          if(err){
              return err;
          }else{
              console.log("Removed all users successfully!");
          }
          res.send({});
        });
      }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
      }
    },

    async getSingleUser(req,res){
      console.log("getsingleuser");
      if(authToken(req.headers.authorization)){
          var fetchedUser = await User.findById(req.params.id).exec()
          .catch(function(error){return 'Error occured'});

          res.send(fetchedUser);

      }else{
        console.log("Authentication failed")
        // Check format of this
        res.send("Not authorized")
      }
    
    },

    async getAllUsers(req,res){
      console.log("getallusers");
      if(authToken(req.headers.authorization)){
        var fetchedUsers = await User.find().exec()
        .catch(function(error){return 'Error occured'});
        res.send(fetchedUsers);

      }else{
        console.log("Authentication failed")
        // Check format of this
        res.send("Not authorized")
      }
       
    }

}
