const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts' })
            .populate({ path: 'friends' })
            .sort({ _id: -1 })
            .then(dbUserData  => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //get a single user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts' })
            .populate({ path: 'friends' })
            .then(dbUserData  => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //post a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData  => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //put to update a user by _id
    updateUser({ params , body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete to remove a user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //add friend to user by friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete friend from user by friendId
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;