// controllers/shiftController.js

const Shift = require('../models/Shift')
const Employee = require('../models/Employee')

// Get all shifts
const getAllShifts = async (req, res) => {
    try {
        const shifts = await Shift.find().populate('employees', 'firstName lastName') // Fetch shifts with employee details
        res.json(shifts)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Get a specific shift by ID
const getShiftById = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id).populate('employees', 'firstName lastName')
        if (!shift) {
            return res.status(404).json({ message: 'Shift not found' })
        }
        res.json(shift)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Create a new shift
const createShift = async (req, res) => {
    try {
        const { date, startHour, endHour, employees } = req.body
        
        const newShift = new Shift({ date, startHour, endHour, employees })
        await newShift.save()
        res.status(201).json(newShift)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Update an existing shift
const updateShift = async (req, res) => {
    try {
        const { date, startHour, endHour, employees } = req.body
        const updatedShift = await Shift.findByIdAndUpdate(
            req.params.id,
            { date, startHour, endHour, employees },
            { new: true }
        )
        if (!updatedShift) {
            return res.status(404).json({ message: 'Shift not found' })
        }
        res.json(updatedShift)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Assign an employee to a shift
const assignEmployeeToShift = async (req, res) => {
    try {
        const { employeeId } = req.body
        const shift = await Shift.findById(req.params.id)
        if (!shift) {
            return res.status(404).json({ message: 'Shift not found' })
        }

        const employee = await Employee.findById(employeeId)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }

        if (!shift.employees.includes(employeeId)) {
            shift.employees.push(employeeId)
            await shift.save()
        }

        res.json({ message: 'Employee assigned to shift', shift })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { getAllShifts, getShiftById, createShift, updateShift, assignEmployeeToShift }
