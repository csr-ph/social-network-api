const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;