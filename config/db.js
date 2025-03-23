// config/db.js

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config() // Load environment variables from .env file

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) // No need for deprecated options
        console.log('MongoDB Connected')
    } catch (error) {
        console.error('MongoDB Connection Error:', error)
        process.exit(1) // Exit process with failure
    }
}

module.exports = connectDB