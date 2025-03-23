// routes/departmentRoutes.js

const express = require('express')
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController')

const router = express.Router()

// Route to get all departments
router.get('/', getAllDepartments)

// Route to get a specific department by ID
router.get('/:id', getDepartmentById)

// Route to create a new department
router.post('/', createDepartment)

// Route to update an existing department
router.put('/:id', updateDepartment)

// Route to delete a department
router.delete('/:id', deleteDepartment)

module.exports = router
