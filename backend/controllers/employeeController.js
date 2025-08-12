const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private (Manager, Admin)
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: { $in: ['employee', 'manager'] } }).select('-password');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private (Manager, Admin)
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
