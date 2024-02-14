const { Thought, User } = require('../models');

module.exports = {
    //`GET` request to get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate({
                path: 'reactions',
                select: '-__v'
            })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //`GET` request for a single thought by its `_id`
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId 
            });

            if (!thought) {
                return res.status(404).json({ message: `That id has no thought` });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // `POST` request to create new thought
    async createThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought_id} },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought posted, but no user found with that ID',
                })
            }

            res.json('Thought had');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //`PUT` request to update a thought by its `_id`
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: `That thought doesn't exist - check ID` });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //`DELETE` request to remove a thought by its `_id`
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: `That thought doesn't exist - check ID` });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted, but no user found with that ID',
                });
            }

            res.json({ message: 'Application successfully deleted!' });
            } catch (err) {
                res.status(500).json(err);
            }
        },
};