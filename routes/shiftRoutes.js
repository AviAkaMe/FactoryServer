// routes/shiftRoutes.js

const express = require('express')
const { getAllShifts, getShiftById, createShift, updateShift, assignEmployeeToShift } = require('../controllers/shiftController')

const router = express.Router()

// Route to get all shifts
router.get('/', getAllShifts)

// Route to get a specific shift by ID
router.get('/:id', getShiftById)

// Route to create a new shift
router.post('/', createShift)

// Route to update an existing shift
router.put('/:id', updateShift)

// Route to assign an employee to a shift
router.post('/:id/assign', assignEmployeeToShift)

module.exports = router
