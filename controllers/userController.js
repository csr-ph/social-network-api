const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with the given id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with the given id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with the given id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No Friend exists with the given id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
    
}

module.exports = userController;