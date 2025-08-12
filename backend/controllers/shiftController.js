const Shift = require('../models/Shift');

// // @desc    Get all shifts
// // @route   GET /api/shifts
// // @access  Private (Manager, Admin)
// exports.getShifts = async (req, res) => {
//     try {
//         const shifts = await Shift.find().populate('createdBy', 'name email');
//         res.status(200).json(shifts);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// };

// // @desc    Get single shift
// // @route   GET /api/shifts/:id
// // @access  Private (Manager, Admin)
// exports.getShiftById = async (req, res) => {
//     try {
//         const shift = await Shift.findById(req.params.id).populate('createdBy', 'name email');
//
//         if (!shift) {
//             return res.status(404).json({message: 'Shift not found'});
//         }
//
//         res.status(200).json(shift);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// };

// @desc    Create a shift
// @route   POST /api/shifts
// @access  Private (Manager, Admin)
exports.createShift = async (req, res) => {
    try {
        const {date, startTime, endTime, requiredStaff, location} = req.body;

        const shift = new Shift({
            date,
            startTime,
            endTime,
            requiredStaff,
            location,
            createdBy: req.user.id
        });

        const createdShift = await shift.save();
        res.status(201).json(createdShift);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// // @desc    Update a shift
// // @route   PUT /api/shifts/:id
// // @access  Private (Manager, Admin)
// exports.updateShift = async (req, res) => {
//     try {
//         const shift = await Shift.findById(req.params.id);
//
//         if (!shift) {
//             return res.status(404).json({message: 'Shift not found'});
//         }
//
//         shift.date = req.body.date || shift.date;
//         shift.startTime = req.body.startTime || shift.startTime;
//         shift.endTime = req.body.endTime || shift.endTime;
//         shift.requiredStaff = req.body.requiredStaff || shift.requiredStaff;
//         shift.location = req.body.location || shift.location;
//
//         const updatedShift = await shift.save();
//         res.status(200).json(updatedShift);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// };

// // @desc    Delete a shift
// // @route   DELETE /api/shifts/:id
// // @access  Private (Manager, Admin)
// exports.deleteShift = async (req, res) => {
//     try {
//         const shift = await Shift.findById(req.params.id);
//
//         if (!shift) {
//             return res.status(404).json({message: 'Shift not found'});
//         }
//
//         await shift.remove();
//         res.status(200).json({message: 'Shift removed'});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// };