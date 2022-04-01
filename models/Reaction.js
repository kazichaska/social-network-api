const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal, 'dddd, mmmm dS, yyyy')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = reactionSchema;