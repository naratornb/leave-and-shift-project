const User = require('../models/User');

// @desc    Create an employee
// @route   POST /api/employees
// @access  Private (Admin only)
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, position, contact } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const employee = await User.create({
      name,
      email,
      password,
      role: role || 'employee',
      position,
      contact
    });

    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      position: employee.position,
      contact: employee.contact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
