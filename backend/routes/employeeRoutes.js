const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  deactivateEmployee,
  activateEmployee
} = require('../controllers/employeeController');

// All routes require authentication
router.use(protect);

// Routes restricted to managers and admins
router.use(authorize('manager', 'admin'));

router.route('/')
  .get(getEmployees)
  .post(authorize('admin'), createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(authorize('admin'), deleteEmployee);

router.route('/:id/deactivate')
  .put(deactivateEmployee);

router.route('/:id/activate')
  .put(activateEmployee);

module.exports = router;