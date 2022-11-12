const { User } = require('../models');

module.exports =  {
  // get all users
  getAllUser(req, res) {
    User.find({})
    .populate ({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({_id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get one user by id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
          .then(dbUserData => {
            // If no pizza is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
  // create user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  };
  

