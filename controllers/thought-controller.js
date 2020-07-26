const { Thought, User } = require('../models');

const thoughtController ={
    getAllThought(req,res) {
        Thought.find({})
            .populate({
                path: 'reactions'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { Thought: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id.' });
                  return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this id. ' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    addReaction({ params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id.' });
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.commentId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id.' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { comments: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id.' });
                  return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;