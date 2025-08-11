const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:mm)!`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:mm)!`
        }
    },
    requiredStaff: {
        type: Number,
        required: true,
        min: [1, 'Required staff must be at least 1']
    },
    location: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Virtual fields for full datetime calculations
shiftSchema.virtual('startDateTime').get(function() {
    const date = new Date(this.date);
    const [hours, minutes] = this.startTime.split(':');
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
});

shiftSchema.virtual('endDateTime').get(function() {
    const date = new Date(this.date);
    const [hours, minutes] = this.endTime.split(':');
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
});

// Ensure virtual fields are included in JSON
shiftSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Shift', shiftSchema);