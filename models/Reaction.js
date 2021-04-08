const { Schema, Types } = require("mongoose");
const dateFormat = require('../utils/date-format');

const ReactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: "Please enter your reaction here.",
        maxlength: 280,
    },
    username: {
        type: String,
        required: "Username is required.",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    },
    {
    toJSON: {
        getters: true,
    },
        id: false,
    }
);

module.exports = ReactionSchema; 