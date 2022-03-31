const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const ThoughtsSchema = new Schema(
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
        userName: [
            {
                type: Schema.ObjectId,
                ref: 'Users'
            }
        ],
        reactions: [
            {
                type: Schema.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;

