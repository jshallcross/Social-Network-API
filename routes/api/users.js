const router = require("express").Router();

const {
    getUsers,
    newUser,
    getSingleUser,
    updateUser,
    deleteUser
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

module.exports = router;