const { Schema, model } = require("mongoose");
const reaction = require("./Reaction");
const dateFormat = require('../utils/date-format');

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: "Please enter your thoughts here.",
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: "Username is required.",
    },
    reactions: [reaction],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
        id: false,
    }
);


ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});



const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;