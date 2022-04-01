const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /.+\@.+\..+/.test(v);
                },
                message: "Please enter valid email address!"
            }
        },
        thoughts: [
            {
                type: Schema.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;