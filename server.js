// server.js

// Import required modules
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db') // Import database connection function
const { authenticateUser } = require('./middleware/authMiddleware') // Import authentication middleware
const { logUserAction } = require('./middleware/actionLogger') // Import action logging middleware

// Import route handlers
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const shiftRoutes = require('./routes/shiftRoutes')

dotenv.config() // Load environment variables
connectDB() // Connect to MongoDB

const app = express()
app.use(express.json()) // Middleware to parse incoming JSON requests

// Define API routes
app.use('/api/auth', authRoutes) // Authentication does not need middleware

// Apply authentication and logging middleware to protected routes
app.use('/api/users', authenticateUser, logUserAction, userRoutes)
app.use('/api/employees', authenticateUser, logUserAction, employeeRoutes)
app.use('/api/departments', authenticateUser, logUserAction, departmentRoutes)
app.use('/api/shifts', authenticateUser, logUserAction, shiftRoutes)

// Define server port
const PORT = process.env.PORT || 5000

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
