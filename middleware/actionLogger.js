// middleware/actionLogger.js

const fs = require('fs')
const path = require('path')
const User = require('../models/User')

const logFilePath = path.join(__dirname, '../logs/actions.log')

// Middleware to log user actions and enforce action limits
const logUserAction = async (req, res, next) => {
    try {
        const user = req.user // Get authenticated user from request

        if (user.numOfActions <= 0) {
            return res.status(403).json({ message: 'Action limit reached. Please try again tomorrow.' })
        }

        // Reduce user action count
        user.numOfActions -= 1
        await user.save()

        // Create log entry
        const logEntry = {
            userId: user._id,
            fullName: user.fullName,
            action: `${req.method} ${req.originalUrl}`,
            timestamp: new Date().toISOString()
        }

        // Append log entry to file
        fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', (err) => {
            if (err) {
                console.error('Error logging user action:', err)
            }
        })

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { logUserAction }
