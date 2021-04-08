const { User } = require("../models");

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((dbUsedData) => res.json(dbUsedData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Create a new user
newUser({ body }, res) {
    User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(404).json(err));
    }

}




module.exports = userController;