import axiosInstance from "../axiosConfig";

const API_URL = '/api/shifts/';

// Create new shift
const createShift = async (shiftData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosInstance.post(API_URL, shiftData, config);
    return response.data;
};

// Get all shifts
const getShifts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosInstance.get(API_URL, config);
    return response.data;
};

// Get single shift
const getShift = async (shiftId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosInstance.get(API_URL + shiftId, config);
    return response.data;
};

// Update shift
const updateShift = async (shiftId, shiftData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosInstance.put(API_URL + shiftId, shiftData, config);
    return response.data;
};

// Delete shift
const deleteShift = async (shiftId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosInstance.delete(API_URL + shiftId, config);
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