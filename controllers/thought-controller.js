const { Thought, User } = require('../models');


const thoughtController = {
// Find all thoughts
getThoughts(req, res) {
    Thought.find()
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
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
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

//update thought
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



}




module.exports = thoughtController;