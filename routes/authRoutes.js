const express = require('express')
const { loginUser } = require('../controllers/authController')

const router = express.Router()

router.post('/login', loginUser) // Define routes properly

module.exports = router // Ensure router is exported correctly