const workouts = require('express').Router()

workouts.get('/', async (req, res) => {
    try {
        return res.status(200).json({
            message: `Workout GET all`
        })
    } catch (err) {

    }
})

workouts.get('/:id', async (req, res) => {
    try {

    } catch (err) {
        
    }
})

workouts.post('/', async (req, res) => {
    try {

    } catch (err) {
        
    }
})

workouts.put('/:id', async (req, res) => {
    try {

    } catch (err) {
        
    }
})

workouts.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        
    }
})

module.exports = workouts