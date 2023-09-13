// requires
const workouts = require('express').Router()
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
workouts.get('/', async (req, res) => {
    try {
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        if (authenticationMethod == 'Bearer') {
            const result = await jwt.decode(token)
            console.log(result)
            const { id } = result.value
            const allWorkouts = await Workout.find({ user: id }).sort({ createdAt: -1 })
            res.status(200).json(allWorkouts)
        }
    } catch {
        res.status(500).json({ message: 'Server error' })
    }
})


// get workout by id
workouts.get('/:id', async (req, res) => {
    const { id } = req.params

    // check if req id === mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This workout is not a valid id' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "This workout does not exist" })
    }

    res.status(200).json(workout)
})

// create workout
workouts.post('/', async (req, res) => {
    const { title, reps, weight, sets, user } = req.body
    try {
        const newWorkout = await Workout.create({ title, reps, sets, weight, user })
        return res.status(200).json(newWorkout)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// update workout
workouts.put('/:id', async (req, res) => {
    const { id } = req.params

    // check if req id === mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This workout is not a valid id' })
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
        new: true
    })

    if (!updatedWorkout) {
        return res.status(404).json({ error: 'This workout does not exist' })
    }

    res.status(200).json(updatedWorkout)
})

workouts.delete('/:id', async (req, res) => {
    const { id } = req.params

    // check if req id === mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This workout is not a valid id' })
    }

    const deletedWorkout = await Workout.findByIdAndDelete({ _id: id })

    if (!deletedWorkout) {
        res.status(400).json({ error: 'This workout does not exist' })
    }

    res.status(200).json(deletedWorkout)
})

module.exports = workouts