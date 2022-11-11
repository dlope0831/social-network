const { User } = require('../models');

module.exports =  {
    getAllUser(req, res) {
        User.find()
          .then((posts) => res.json(posts))
          .catch((err) => {
            console.error({ message: err });
            return res.status(500).json(err);
          });
      },
    }

