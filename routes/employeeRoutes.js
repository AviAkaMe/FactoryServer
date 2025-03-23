// routes/employeeRoutes.js

const express = require('express')
const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController')

const router = express.Router()

// Route to get all employees
router.get('/', getAllEmployees)

// Route to get a specific employee by ID
router.get('/:id', getEmployeeById)

// Route to create a new employee
router.post('/', createEmployee)

// Route to update an existing employee
router.put('/:id', updateEmployee)

// Route to delete an employee
router.delete('/:id', deleteEmployee)

module.exports = router
