// models/Department.js

const mongoose = require('mongoose')

// Define Department Schema
const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Department name is required
        unique: true // Ensure department name is unique
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to Employee collection (Manager)
        required: false // Optional: A department may not have a manager initially
    }
}, { timestamps: true }) // Automatically manage createdAt and updatedAt fields

// Create Department model
const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department
