// models/Shift.js

const mongoose = require('mongoose')

// Define Shift Schema
const ShiftSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true // Shift date is required
    },
    startHour: {
        type: Number,
        required: true // Shift start hour is required
    },
    endHour: {
        type: Number,
        required: true // Shift end hour is required
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' // References Employee collection (employees assigned to shift)
    }]
}, { timestamps: true }) // Automatically manage createdAt and updatedAt fields

// Create Shift model
const Shift = mongoose.model('Shift', ShiftSchema)

module.exports = Shift
