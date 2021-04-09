const { User } = require("../models");

const userController = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
            .select('-__v')
            .sort({ _id: -1})
            .then((dbUserData) => res.json(dbUserData))
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

// Get a user by id
getSingleUser({ params}, res) {
    User.findOne({ _id: params.id})
        .populate({
        path: 'thoughts',
        select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: "Sorry, No user with that ID"});
                return;
            }
            res.json(dbUserData);
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
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({message: " Sorry, No user with that ID"});
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        res.status(404).json(err);
        });
    },

// Delete a user
deleteUser(req, res) {
    User.findOneAndDelete(
        {_id: req.params.id}
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({message: "Sorry, No User with that ID"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        res.status(404).json(err);
    })
},

// Add a friend to a user
addFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        {$push: {friends: params.friendId}},
        {runValidators: true, new: true}
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({message: "Could not add friend, No user with that ID"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(404).json(err));
},

// Delete a friend from a user
deleteFriend({params}, res) {
    User.findOneAndUpdate (
        {_id: params.userId},
        {$pull: {friends: params.friendId}},
        {new: true}
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({message: "Could not delete friend, No user with that ID"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
}

}




module.exports = userController;