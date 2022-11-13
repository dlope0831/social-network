const router = require('express').Router();

const {
    getAllThought,
    addThought,
    getThoughtById,

} = require('../../controllers/thought-controller');

// Set up to GET all and POST at /api/thoughts
router
.route('/')
.get(getAllThought)
.post(addThought);

// Set up GET all and POST at /api/thoughts/<userId>
router
.route('/:id')
.get(getThoughtById);



module.exports = router;  