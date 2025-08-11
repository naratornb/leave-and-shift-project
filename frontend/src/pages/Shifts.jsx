import axios from 'axios';

const API_URL = '/api/shifts/';

// Create new shift
const createShift = async (shiftData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, shiftData, config);
    return response.data;
};

// Get all shifts
const getShifts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

// Get single shift
const getShift = async (shiftId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL + shiftId, config);
    return response.data;
};

// Update shift
const updateShift = async (shiftId, shiftData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(API_URL + shiftId, shiftData, config);
    return response.data;
};

// Delete shift
const deleteShift = async (shiftId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + shiftId, config);
    return response.data;
};

const shiftService = {
    createShift,
    getShifts,
    getShift,
    updateShift,
    deleteShift
};

export default shiftService;