const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
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
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.ObjectId,
                ref: 'Users'
            }
        ]
    },
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('Users', UserSchema);

module.exports = Users;