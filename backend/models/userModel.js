// require mongoose
const mongoose = require('mongoose');
const workoutModel = require('./workoutModel');

// create schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },   
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true }},
    token: { type: String }
})

userSchema.virtual('workouts', {
    ref: workoutModel,
    localField: '_id',
    foreignField: 'user'
})

module.exports = mongoose.model('User', userSchema);