
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const shiftRoutes = require('./routes/shiftRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
// Expose API path
app.use('/api/shifts', shiftRoutes);
app.use('/api/employees', employeeRoutes);

// Other routes...
// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


module.exports = app
