const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createPost,
} = require('../../controllers/user-controller');

router
.route('/')
.get(getAllUser)
.post(createPost);

router
.route('/:id')
.get(getUserById);



module.exports = router;