const { Schema, model } = require("mongoose");

var validateEmail = function(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email)
};


const UserSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: "Sorry, username is a required field.",
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, "Please enter a valid email address."],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address.']
    },
    thought: [
        {
        type: Schema.Types.ObjectId,
        ref: "Thought",
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    },
    {
    toJSON: {
        virtuals: true,
    },
        id: false,
    }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});


const User = model("User", UserSchema);

module.exports = User;