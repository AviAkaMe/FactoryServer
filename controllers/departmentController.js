// controllers/departmentController.js

const Department = require('../models/Department')
const Employee = require('../models/Employee')

// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('manager', 'firstName lastName') // Fetch departments with manager details
        res.json(departments)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Get a specific department by ID
const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('manager', 'firstName lastName')
        if (!department) {
            return res.status(404).json({ message: 'Department not found' })
        }
        res.json(department)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Create a new department
const createDepartment = async (req, res) => {
    try {
        const { name, manager } = req.body
        
        // Check if department name already exists
        const existingDepartment = await Department.findOne({ name })
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department name already exists' })
        }

        // Create new department
        const newDepartment = new Department({ name, manager })
        await newDepartment.save()
        res.status(201).json(newDepartment)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Update an existing department
const updateDepartment = async (req, res) => {
    try {
        const { name, manager } = req.body
        const updatedDepartment = await Department.findByIdAndUpdate(
            req.params.id,
            { name, manager },
            { new: true }
        )
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' })
        }
        res.json(updatedDepartment)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// Delete a department and remove employees from that department
const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id)
        if (!department) {
            return res.status(404).json({ message: 'Department not found' })
        }

        // Remove department reference from employees
        await Employee.updateMany({ departmentId: department._id }, { $unset: { departmentId: 1 } })

        await department.deleteOne()
        res.json({ message: 'Department deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment }