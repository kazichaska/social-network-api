const { Schema, model, Types } = require('mongoose');

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
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal, 'dddd, mmmm dS, yyyy')
    }
});

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;