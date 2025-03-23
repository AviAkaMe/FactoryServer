// controllers/userController.js

const User = require('../models/User')

// Get user action details
const getUserActions = async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ numOfActions: user.numOfActions }) // Return number of actions left
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Decrement user actions
const decrementUserActions = async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        if (user.numOfActions <= 0) {
            return res.status(403).json({ message: 'Action limit reached. Please try again tomorrow.' })
        }
        
        user.numOfActions -= 1 // Decrease action count
        await user.save() // Save updated user data

        res.json({ message: 'Action recorded', numOfActions: user.numOfActions })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { getUserActions, decrementUserActions }
