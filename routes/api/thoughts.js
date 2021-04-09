
const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getThoughtById,
    updateThought,
} = require('../../controllers/thought-controller');



router
    .route('/')
    .get(getThoughts)
    .post(createThought);


router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);


module.exports = router;