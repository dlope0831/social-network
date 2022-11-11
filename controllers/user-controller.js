const { trusted } = require('mongoose');
const { User } = require('../models');

const userController =  {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate ({
            path: 'thoughts',
            select: '-__v'
        })
        .sort({_id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
}


module.exports = userController;