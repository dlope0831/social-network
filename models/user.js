const { Schema, model, Types, default: mongoose} = require("mongoose");
const dateFormat = require("../utils/dateFormat");


const UserSchema = new Schema (
    {
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,   
        match: /.+\@.+\..+/,
        unique: true
    },
    thoughts: [ 
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
    },
    { 
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        }
    );
const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

module.exports = User;