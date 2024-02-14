const { User, Application, Thought } = require('../models');

module.exports = {
    // `GET` request of all users
    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //`GET` single user its `_id` and populate thought and friend data
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'User not found with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // `POST` a new user
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //`DELETE` to remove user by its `_id`
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'User not found with that ID' });
          }
    
          await Thought.deleteMany({ _id: { $in: user.applications } });
          res.json({ message: 'User and their thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //`PUT` to update a user by its `_id`
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found with that ID' });
            }

            res.json(user);
            } catch (err) {
            console.log(err);
            res.status(500).json(err);
    }
  },
};