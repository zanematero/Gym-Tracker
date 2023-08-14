// requires
const workouts = require('express').Router()
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
workouts.get('/', async (req, res) => {
    const Allworkouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(Allworkouts)
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
        return res.status(404).json({ error: "This workout does not exist"})
    }

    res.status(200).json(workout)
})

// create workout
workouts.post('/', async (req, res) => {
    const { title, reps, weight, sets } = req.body
    try {
        const newWorkout = await Workout.create({title, reps, sets, weight})
        res.status(200).json(newWorkout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// update workout
workouts.put('/:id', async (req, res) => {
    const { id } = req.params

    // check if req id === mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This workout is not a valid id' })
    }

    const updatedWorkout = await Workout.findOneAndUpdate({ _id: id}, {
        ...req.body
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

    const deletedWorkout = await Workout.findByIdAndDelete({ _id: id})

    if (!deletedWorkout) {
        res.status(400).json({ error: 'This workout does not exist' })
    }

    res.status(200).json(deletedWorkout)
})

module.exports = workouts