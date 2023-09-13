const auth = require('express').Router()
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

auth.get('/current', async (req, res) => {
    try {
        const [authenticationMethod, token] = req.headers.authorization.split(' ')
        console.log("received authorization headers:", req.headers.authorization)
        if (authenticationMethod == 'Bearer' && token) {
            const result = await jwt.decode(token)
            console.log("result:", result)

            if (result && result.user_id) {
                const currentUser = await User.findById(result.user_id);
                console.log("currentUser:", currentUser);

                if (currentUser) {
                    return res.json(currentUser)
                }
            }
        } // access current user for updating state
    } catch {
        res.json(null)
    }
})

auth.post("/signup", async (req, res) => {
    try {
        if (!(req.body.username && req.body.password && req.body.email)) {
            return res.status(400).send("Both forms are required");
        } // check if all forms included

        const duplicate = await User.findOne({ email: req.body.email }) // check if user exists

        if (duplicate) {
            return res.status(409).send("User already exists.")
        } // if email found dont create user

        encryptedPassword = await bcrypt.hash(req.body.password, 10); // apply salt and hash
        console.log("hashing entered password")
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        }) // create user
        console.log("created user:", user.username)
        const token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        ); // create token

        user.token = token; // apply token to user
        console.log("created user token:", user.token)
        return res.status(201).json(user); // return user
    } catch (err) {
        console.log(err);
    }
});

auth.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // take user, email, and pass from body

        if (!(username && password)) {
            return res.status(400).send("All inputs are required")
        } // check if both included

        const user = await User.findOne({ username }) // find if user exists
        console.log("user found")
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("passwords match, creating token")
            const token = jwt.sign(
                { user_id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            ); // if user exists and passwords match create token

            user.token = token; // assign token
            console.log("token created:", user.token)

            return res.status(200).json(user) // return user
        }
        return res.status(400).send("Invalid Credentials"); // user does not exist or password does not match
    } catch (err) {
        console.log(err)
    }
});

auth.get("/logout", async (req, res) => {
    try {
        const authHeader = req.headers['cookie']; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(204); // No content
        const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
        const accessToken = cookie.split(';')[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // if true, send a no content response.
        if (checkIfBlacklisted) return res.sendStatus(204);
        // otherwise blacklist token
        const newBlacklist = new Blacklist({
            token: accessToken,
        });
        await newBlacklist.save();
        // Also clear request cookie on client
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
    res.end();
})

module.exports = auth
