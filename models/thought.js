const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema (
    {
        throughText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
            }
    },
    {
        username: {
            type: String,
            required: true
        }
    },
    {
        reactions: [reactionSchema]
    },
    { 
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        }
    );

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
})