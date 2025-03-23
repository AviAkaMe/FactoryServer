// controllers/employeeController.js

const Employee = require('../models/Employee')
const Department = require('../models/Department')

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('departmentId', 'name') // Fetch employees with department details
        res.json(employees)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Get a specific employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('departmentId', 'name')
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.json(employee)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Create a new employee
const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, startWorkYear, departmentId } = req.body
        
        // Ensure the department exists
        const department = await Department.findById(departmentId)
        if (!department) {
            return res.status(400).json({ message: 'Invalid department ID' })
        }

        const newEmployee = new Employee({ firstName, lastName, startWorkYear, departmentId })
        await newEmployee.save()
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Update an existing employee
const updateEmployee = async (req, res) => {
    try {
        const { firstName, lastName, startWorkYear, departmentId } = req.body
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, startWorkYear, departmentId },
            { new: true }
        )
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.json(updatedEmployee)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.json({ message: 'Employee deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee }
