const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
        },
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

//Virtual 'friendCount' to retrieve length of user's friends array field on query
userSchema.virtual('friendCount').get(function () {return this.friends.length;});

const User = model('user', userSchema);

module.exports = User;