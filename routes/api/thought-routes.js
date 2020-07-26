const router = require('express').Router();
const { getAllThought, getOneThought, addThought, updateThought, addReaction, removeThought, removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId')
    .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
// addReaction is a Put, as we are updating a thought
router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

router.route('/:toughtId/reactions')
    .post(addReaction)
    
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

router.route('/')
    .get(getAllThought);

module.exports = router;