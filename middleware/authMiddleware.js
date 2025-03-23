// middleware/authMiddleware.js

const User = require('../models/User')

// Middleware to authenticate users
const authenticateUser = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] // Expecting user ID in request headers
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No user ID provided' })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' })
        }

        req.user = user // Attach user info to request object
        next() // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { authenticateUser }
