const router = require("express").Router();

const {
    getUsers,
    newUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

router
    .route("/")
    .get(getUsers)
    .post(newUser);


router
    .route("/:id")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;