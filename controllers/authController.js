// controllers/authController.js

const axios = require('axios')
const User = require('../models/User')

// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email } = req.body // Get email from request body

        // Fetch users from external API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const users = response.data

        // Find matching user from external API
        const matchedUser = users.find(user => user.email === email)

        if (!matchedUser) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Check if user exists in our database
        let user = await User.findOne({ email })

        if (!user) {
            // If user does not exist, create a new one
            user = new User({
                fullName: matchedUser.name,
                email: matchedUser.email,
                password: 'default_password', // Placeholder password (should be changed later)
                numOfActions: 10 // Default action limit
            })
            await user.save()
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                numOfActions: user.numOfActions
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { loginUser }
