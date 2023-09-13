// requires
require('dotenv').config()
const mongoose = require('mongoose')
const workoutController = require('./controllers/workoutsController')
const userController = require('./controllers/usersController')
const authController = require('./controllers/authenticationController')

// express set up
const express = require('express')
const app = express()

// middleware
const cors = require('cors')
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || [`https://gym-tracker-client-4rt95oda1-zanematero.vercel.app/`].indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('URL not allowed by CORS'))
        }
    }, 
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.json())

// controllers
app.use('/workouts', workoutController)
app.use('/users', userController)
app.use('/auth', authController)

// handle other endpoints
app.get('*', (req, res) => {
    res.status(404).json({ message: 'This URL endpoint does not exist.' })
})

// database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
