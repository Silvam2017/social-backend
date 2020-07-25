const router = require('express').Router();
const { addThought, addReaction, removeThought, removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
// addReaction is a Put, as we are updating a thought
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;