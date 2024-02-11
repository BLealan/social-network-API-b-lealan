const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^.{1,280}$/.test(value);
            },
            message: 'Please limit your thoughts to between 1 and 280',
        },
    },
    createdAt: {
        date: 
        //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        //Array of nested documents created with the `reactionSchema`
    },
});

//Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

module.exports = Thoughts;