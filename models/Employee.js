// models/Employee.js

const mongoose = require('mongoose')

// Define Employee Schema
const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // First name is required
    },
    lastName: {
        type: String,
        required: true // Last name is required
    },
    startWorkYear: {
        type: Number,
        required: true // Employee's start work year is required
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to Department collection
        required: true
    }
}, { timestamps: true }) // Automatically manage createdAt and updatedAt fields

// Create Employee model
const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee
