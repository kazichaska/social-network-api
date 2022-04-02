const { User } = require('../models');

const usersController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // add friend POST /api/users/:userId/friends/:friendId
    addFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $push: { friends: { _id: params.friendId } } })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // delete friend
    deleteFriend({ params, body }, res) {
        User.findOneAndDelete({ _id: params.userId },
            {
                $pull: { friends: { _id: params.friendId } }
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // DELETE user by id /api/users/:userId/friends/:friendId
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true },
            { runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}


module.exports = usersController;