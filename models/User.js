const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { 
        type: String,
        unique: true,
        required: true,
        trim: true},
    email: { 
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: `Please try again, that email is invalid`,
        },
    },
    thoughts: {
        //Array of `_id` values referencing the `Thought` model
    },
    friends: {
        //Array of `_id` values referencing the `User` model (self-reference)
    },
});

//Virtual 'friendCount' to retrieve length of user's friends array field on query

module.exports = User;