// models/User.js

const mongoose = require('mongoose')

// Define User Schema
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // Full name is required
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true // Password is required
    },
    numOfActions: {
        type: Number,
        required: true, // Number of actions allowed per day
        default: 10 // Default limit for user actions per day
    }
}, { timestamps: true }) // Automatically manage createdAt and updatedAt fields

// Create User model
const User = mongoose.model('User', UserSchema)

module.exports = User
