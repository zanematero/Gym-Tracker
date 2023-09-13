// requires
const users = require('express').Router()
const User = require('../models/userModel')
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

// get all workouts
users.get('/', async (req, res) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

users.get('/:id', async (req, res) => {
    // check if req id === mongoose object id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'This user is not a valid id' })
    }
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: "This user does not exist" })
    }

    res.status(200).json(user)
})

users.get('/workouts/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // Find the user by username and populate the 'workouts' field
        const user = await User.findOne({ username }).populate('workouts');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.workouts);
    } catch (error) {
        console.error('Error fetching user-specific workouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

users.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

users.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updatedUser)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

users.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ deletedUser })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = users