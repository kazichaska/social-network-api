const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts: (req, res) => {
        // console.log("this is the getAllThoughts function");
        Thought.find()
            .select('-__v')
            .then(dbThoughtData => {
                // console.log("dbthoughtdata success", dbThoughtData);
                res.json(dbThoughtData);
            })
            .catch(err => {
                // console.log("dbthoughtdata error");
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
    createReaction: ({ params, body }, res) => {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true }
        )
            .then(dbThoughtData => {
                // console.log(dbThoughtData, "this is test");
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // delete reaction /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction: ({ params }, res) => {
        console.log("this is the deleteReaction function");
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbThoughtData => {
                console.log("dbthoughtdata success", dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction id found!' });
                    return;
                }
                res.json({ message: 'Successfully deleted the reaction!' })
            })
            .catch(err => {
                console.log("dbthoughtdata error");
                res.status(400).json(err);
            });
    }
};


module.exports = thoughtController;