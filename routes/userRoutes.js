// routes/userRoutes.js

const express = require('express')
const { getUserActions, decrementUserActions } = require('../controllers/userController')

const router = express.Router()

// Route to get user action details
router.get('/:id/actions', getUserActions)

// Route to decrement user actions when an operation is performed
router.post('/:id/actions/decrement', decrementUserActions)

module.exports = router
