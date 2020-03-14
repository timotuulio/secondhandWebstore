// Controller for api when searching users
const User = require('../models/userModel');
const xssFilters = require('xss-filters');


module.exports = {

    addUser(req,res){
      //TODO: Add every info to be added (email, number, etc)
      //TODO: Check that every required info exist)
      // TODO: hash password
      const userToBeAdded = req.body;
      console.log(userToBeAdded);
      newUser = new User();
      newUser.name = xssFilters.inHTMLData(userToBeAdded.name);
      newUser.role = xssFilters.inHTMLData(userToBeAdded.role);
      newUser.password = xssFilters.inHTMLData(userToBeAdded.password);

      newUser.save();

      res.send(newUser);

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
