const { Schema, model, Types, default: mongoose } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()   
        }
    },
    {
        reactionBody: {
            type: String,
            required: true,
            max: 280
        }
    },
    {
        username:{ 
        type: String,
        required: true,
        }
    },
    {
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
        }
        },
        {
        toJSON: {
            getters: true
        }
        }
    );

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
        reactions: [ReactionSchema]
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