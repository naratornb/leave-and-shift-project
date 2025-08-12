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

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private (Manager, Admin)
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Only admins can change roles
    if (req.body.role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change role' });
    }

    employee.name = req.body.name || employee.name;
    employee.position = req.body.position || employee.position;
    employee.contact = req.body.contact || employee.contact;

    if (req.user.role === 'admin') {
      employee.role = req.body.role || employee.role;
    }

    // Only update password if provided
    if (req.body.password) {
      employee.password = req.body.password;
    }

    const updatedEmployee = await employee.save();

    res.status(200).json({
      _id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      role: updatedEmployee.role,
      position: updatedEmployee.position,
      contact: updatedEmployee.contact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// @desc    Deactivate an employee
// @route   PUT /api/employees/:id/deactivate
// @access  Private (Manager, Admin)
exports.deactivateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Don't allow deactivating admin accounts
    if (employee.role === 'admin') {
      return res.status(403).json({ message: 'Cannot deactivate admin accounts' });
    }

    employee.active = false;
    await employee.save();

    res.status(200).json({ message: 'Employee deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Activate an employee
// @route   PUT /api/employees/:id/activate
// @access  Private (Manager, Admin)
exports.activateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.active = true;
    await employee.save();

    res.status(200).json({ message: 'Employee activated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};