const { User } = require("../models");

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((dbUsedData) => res.json(dbUsedData))
            .catch((err) => {
                res.status(404).json(err);
            });
    },

// Create a new user
newUser({ body }, res) {
    User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(404).json(err));
    },

// get a user by id
getSingleUser({ params}, res) {
    User.findOne({ _id: params.id})
        
        .then((dbUsedData) => {
            if(!dbUsedData) {
                res.status(404).json({message: "No user with that ID"});
                return;
            }
            res.json(dbUsedData);
        })
        .catch((err) => {
            res.status(404).json(err)
        });
    },

// update a user
updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {runValidators: true, new: true}
    )
    .then((dbUsedData) => {
        if (!dbUsedData) {
            res.status(404).json({message: "No user with that ID"});
        }
        res.json(dbUsedData);
    })
    .catch((err) => {
        res.status(404).json(err);
        });
    },

// delete a user
deleteUser(req, res) {
    User.findOneAndDelete(
        {_id: req.params.id}
    )
    .then((dbUsedData) => {
        if (!dbUsedData) {
            res.status(404).json({message: "No User with that ID"});
            return;
        }
        res.json(dbUsedData);
    })
    .catch((err) => {
        res.status(404).json(err);
    })
}

}




module.exports = userController;