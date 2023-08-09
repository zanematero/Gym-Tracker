// requires
require('dotenv').config()
const mongoose = require('mongoose')
const workoutController = require('./controllers/workoutsController')

// express set up
const express = require('express')
const app = express()

// middleware
app.use(express.json())

// controllers
app.use('/workouts', workoutController)

// handle other endpoints
app.get('*', (req, res) => {
    res.status(404).json({ message: 'This URL endpoint does not exist.' })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to database and listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = app
