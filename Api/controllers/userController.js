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


    loginUser(req,res){

      // Chcekt that header exists, email and password are encoded in the authorization header
      if (req.headers.authorization) {
        var encodedHeader = req.headers.authorization.split(' ')[1];
        var decodedHeader = new Buffer(encodedHeader, 'base64').toString();
        var email = decodedHeader.split(':')[0];
        var password = decodedHeader.split(':')[1];
        
        console.log(email)

        User.findOne({
          'email': email
        }, function(err,user) {
          if (err) return console.error(err);
          if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
              
              // Here username and password matches so create and return a token to user which can be used to perform the operations
              if (result) {
                console.log("ok")

                  

                jwt.sign({name:user._id},secret,{algorithm:'HS256'},function(err, token){

                   // dont send password to client
                   user = {...user._doc};
                   delete user['password']; 

                   console.log(user)


                  res.json({token, user});
                });
                
              } else {
                // password didnt match
                console.log("password did not match")
                res.sendStatus(401);
              }
            });
          }else{
            // No user found
            console.log("no user found")
            res.sendStatus(401);
          }
        });

        console.log("loginuser");
        console.log(req.headers.authorization)

      
      }else{
        console.log("no authorization header")
        res.sendStatus(401);
      // No authorization header
    }
    
  },


    //TODO: Add every info to be added (email, number, etc)
    //TODO: Check that every required info exist)
    addUser(req,res){

      const userToBeAdded = req.body;
      console.log("adduser");
      console.log(userToBeAdded);
      if (req.body && req.body.name && req.body.password && req.body.email &&req.body.role) {
        console.log('adding user');

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

          // First set required fields
          var newUser = new User({
            name: xssFilters.inHTMLData(userToBeAdded.name),
            password: hash,
            role: xssFilters.inHTMLData(userToBeAdded.role),
            email: xssFilters.inHTMLData(userToBeAdded.email),
            balance: 0
          });

          // If additional fields are provided, set them
          if(req.body.bankAccount){
            newUser.bankAccount = xssFilters.inHTMLData(userToBeAdded.bankAccount);
          }
          if(req.body.phoneNumber){
            newUser.phoneNumber = xssFilters.inHTMLData(userToBeAdded.phoneNumber);
          }
          if(req.body.address){
            newUser.address = xssFilters.inHTMLData(userToBeAdded.address);
          }
          
          
          //console.log(newUser)

          newUser.save(function(err) {
            if (err) {
              res.status(500).send(err); 
            };

            console.log("Inserted new user");
            console.log("This is ID:" + newUser._id)
            // Create token and return it
            jwt.sign({name:newUser._id},secret,{algorithm:'HS256'},function(err, token){
              
              user = {...newUser._doc};
              delete user['password']; 
              
              res.json({token,user});
            });
          });

        });
      } else {
        console.log("not enough data");
        res.status(400).send("Data missing");
      }
    },

    async updateUser(req,res){

      if(authToken(req.headers.authorization)){

       

        // Something is wrong with this thing. It cant find with findById >,<
        const userUpdateInfo = req.body;
        console.log(userUpdateInfo);
          // Check that player exists, that is to be modified
        var updatedUser = await User.findById(req.params.id).exec()
            .catch(function(error){return 'Error occured'});

        var funds = updatedUser.balance;

        for (const [key, value] of Object.entries(userUpdateInfo)) { 
          if(key==='balance'){
            updatedUser[key] = parseInt(value)+funds;
          }else{
            updatedUser[key] = value;
          }
          
         
        }
        

        await updatedUser.save();

        console.log(updatedUser);
        res.send(updatedUser);
        

        }else{
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }

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
