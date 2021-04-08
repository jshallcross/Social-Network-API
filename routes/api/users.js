const router = require("express").Router();

const {
    getUsers,
    newUser
} = require("../../controllers/user-controller");

router
    .route("/")
    .get(getUsers)
    .post(newUser);


module.exports = router;