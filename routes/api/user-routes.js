const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

// Set up to GET all and POST at /api/users
router
.route('/')
.get(getAllUser)
.post(createUser);

// Set up to GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
//   .delete(removeComment)


module.exports = router;