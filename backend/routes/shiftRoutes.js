const express = require('express');
const router = express.Router();
const {protect, authorize} = require('../middleware/authMiddleware');
const {
    getShifts, getShiftById, createShift, updateShift, deleteShift
} = require('../controllers/shiftController');

// All routes require authentication
router.use(protect);

// Routes restricted to managers and admins
router.use(authorize('manager', 'admin'));

router.route('/')
    .get(getShifts)
    .post(createShift);

router.route('/:id')
    .get(getShiftById)
    .put(updateShift)
    // .delete(deleteShift);

module.exports = router;