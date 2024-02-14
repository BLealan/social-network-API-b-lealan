const { Schema, model } = require('mongoose');

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
        type: Date ,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
        },
        //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

const rectionSchema = mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        //default value set to new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^.{1,280}$/.test(value);
            },
        },
    },
    username: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date ,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
        },
        //Set default value to the current timestamp
        //Use a getter method to format the timestamp on query
    },
    
})
//Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {return this.reactions.length;});

const Thought = model('thougt', thoughtSchema);

module.exports = Thought;