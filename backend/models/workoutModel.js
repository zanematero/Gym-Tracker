// require mongoose
const mongoose = require('mongoose')

// create schema
const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
