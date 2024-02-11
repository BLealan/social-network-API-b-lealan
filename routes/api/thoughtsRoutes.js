const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController.js');

router.route('/').get(getThougts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;