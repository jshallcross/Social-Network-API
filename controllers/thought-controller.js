const { Thought, User } = require('../models');


const thoughtController = {
// Find all thoughts
getThoughts(req, res) {
    Thought.find()
    .populate({
        path: 'reactions',
        select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(404).json(err);
    });
},

// Create a new thought
createThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true, runValidators: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "Sorry, No user found with this id!" });
        return;
        }
        return res.json({ message: "Success a new thought was made" });
    })
    .catch(err => {
        res.status(404).json(err)   
    }); 
},

  // Find a single though by ID
getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .populate({
        path: 'reactions',
        select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: "Sorry, No thought with that ID!"});
            return;
        }
        res.json(dbThoughtData)
        })
    .catch(err => {
        res.status(404).json(err);
    });
},

// Update a thought
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId }, 
        { $set: body }, 
        { runValidators: true, new: true })
    .then(dbUpdateThoughtData => {
        if (!dbUpdateThoughtData) {
            return res.status(404).json({ message: "Sorry, No thought with this id!" });
        }
        return res.json({ message: "Success you updated your thought" });
    })
    .catch(err => {
        res.status(404).json(err)
    });
},

// Delete a thought
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbDeletedThoughtData => {
            if (!dbDeletedThoughtData) {
        return res.status(404).json({ message: "Sorry, No thought with this id!" });
        }
        return User.findOneAndUpdate(
            { thoughts: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "Sorry, No thought found with this id!" });
        return;
        }
        return res.json({ message: "Success you deleted your thought" });
    })
    .catch(err => {
        res.status(404).json(err)
    });
},


// Add a reaction 
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(dbUpdatedThoughtData => {
        if (!dbUpdatedThoughtData) {
            res.status(404).json({ message: "Sorry, No reaction found with this id!" });
        return;
        }
        return res.json({ message: "Success you added a reaction!" });
    })
    .catch(err => {
        res.status(404).json(err)
    }); 
},

// Delete a reaction
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "Sorry, No reaction found with this id!" });
        return;
        }
        return res.json({ message: "Success you deleted a reaction!" });
    })
    .catch(err => {
        res.status(404).json(err)
    }); 
},


}




module.exports = thoughtController;