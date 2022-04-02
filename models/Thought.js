const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date, 'dddd, mmmm dS, yyyy')
        },
        username: [
            {
                type: String,
                required: true
            }
        ],
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

