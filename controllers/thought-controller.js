const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            {_id: params.userId},
            { $push: {thoughts: _id}},
            { new: true}
        );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbThoughtData);
        }) 
        .catch (err => res.json(err));
    },
    getAllThought(req, res) {
        Thought.find({})
        // .populate ({
        //   path: 'reactions',
        //   select: '-__v'
        // })
        .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        // .populate ({
        //   path: 'reactions',
        //   select: '-__v'
        // })
        .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      
};





module.exports = thoughtController;