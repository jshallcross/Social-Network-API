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
        .populate({
        path: 'thoughts',
        select: '-__v'
        })
        .select('-__v')
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
},

// add a friend to a user
addFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        {$push: {friends: params.friendId}},
        {runValidators: true, new: true}
    )
    .then((dbUsedData) => {
        if (!dbUsedData) {
            res.status(404).json({message: "Could not add friend, No user with that ID"});
            return;
        }
        res.json(dbUsedData);
    })
    .catch((err) => res.status(404).json(err));
},

// delete a friend from a user
deleteFriend({params}, res) {
    User.findOneAndUpdate (
        {_id: params.userId},
        {$pull: {friends: params.friendId}},
        {new: true}
    )
    .then((dbUsedData) => {
        if (!dbUsedData) {
            res.status(404).json({message: "Could not delete friend, No user with that ID"});
            return;
        }
        res.json(dbUsedData);
    })
    .catch((err) => res.json(err));
}

}




module.exports = userController;