const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts: (req, res) => {
        Thought.find()
            .select('-__v')
            .then(dbThoughtData => {
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // get thought by id
    getThoughtById: ({ params }, res) => {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create new thought
    createThought: ({ body }, res) => {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // update thought by id
    updateThought: ({ params, body }, res) => {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // delete thought by id
    deleteThought: ({ params }, res) => {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // create reaction /api/thoughts/:thoughtId/reactions
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true },
            { runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
};

module.exports = thoughtController;