// Controller for api when searching users
const User = require('../models/userModel');
const xssFilters = require('xss-filters');


module.exports = {

    addUser(req,res){
      const userToBeAdded = req.body;
      console.log(userToBeAdded);
      newUser = new User();
      newUser.name = xssFilters.inHTMLData(userToBeAdded.name);
      newUser.role = xssFilters.inHTMLData(userToBeAdded.role);
      // TODO: hash password
      newUser.password = xssFilters.inHTMLData(userToBeAdded.password);

      newUser.save();

      res.send(newUser);

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
    }

}
