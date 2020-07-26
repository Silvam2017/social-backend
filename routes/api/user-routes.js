const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

//set up Get all and Post at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//set up Get one, Put, and Delete at /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//set up put for friends at /api/userId/friends/friendId
router
    .route('/users/:userId/friends/:friendId')
    .put(addFriend)
    .put(deleteFriend);

module.exports = router;