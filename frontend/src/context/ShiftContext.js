import {createContext, useContext, useReducer} from 'react';
import shiftService from "../pages/Shifts";
import {useAuth} from "./AuthContext";

// Initial state
const initialState = {
    shifts: [],
    shift: null,
    isLoading: false,
    error: null,
    success: false
};

// Create context
export const ShiftContext = createContext(initialState);

// Reducer
const shiftReducer = (state, action) => {
    switch (action.type) {
        case 'SHIFT_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'GET_SHIFTS':
            return {
                ...state,
                shifts: action.payload,
                isLoading: false
            };
        case 'GET_SHIFT':
            return {
                ...state,
                shift: action.payload,
                isLoading: false
            };
        case 'CREATE_SHIFT':
            return {
                ...state,
                shifts: [action.payload, ...state.shifts],
                isLoading: false,
                success: true
            };
        case 'UPDATE_SHIFT':
            return {
                ...state,
                shifts: state.shifts.map(shift =>
                    shift._id === action.payload._id ? action.payload : shift
                ),
                isLoading: false,
                success: true
            };
        case 'DELETE_SHIFT':
            return {
                ...state,
                shifts: state.shifts.filter(shift => shift._id !== action.payload),
                isLoading: false,
                success: true
            };
        case 'SHIFT_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case 'RESET_SUCCESS':
            return {
                ...state,
                success: false
            };
        default:
            return state;
    }
};

// Provider component
export const ShiftProvider = ({children}) => {
    const [state, dispatch] = useReducer(shiftReducer, initialState);
    const {user} = useAuth();

    // Get all shifts
    const getShifts = async () => {
        try {
            dispatch({type: 'SHIFT_REQUEST'});
            const shifts = await shiftService.getShifts(user.token);
            dispatch({type: 'GET_SHIFTS', payload: shifts});
        } catch (error) {
            dispatch({type: 'SHIFT_ERROR', payload: error.response.data.message});
        }
    };

    // Get single shift
    const getShift = async (id) => {
        try {
            dispatch({type: 'SHIFT_REQUEST'});
            const shift = await shiftService.getShift(id, user.token);
            dispatch({type: 'GET_SHIFT', payload: shift});
        } catch (error) {
            dispatch({type: 'SHIFT_ERROR', payload: error.response.data.message});
        }
    };

    // Create a shift
    const createShift = async (shiftData) => {
        try {
            dispatch({type: 'SHIFT_REQUEST'});
            const shift = await shiftService.createShift(shiftData, user.token);
            dispatch({type: 'CREATE_SHIFT', payload: shift});
            return true;
        } catch (error) {
            dispatch({type: 'SHIFT_ERROR', payload: error.response.data.message});
            return false;
        }
    };

    // Update a shift
    const updateShift = async (id, shiftData) => {
        try {
            dispatch({type: 'SHIFT_REQUEST'});
            const shift = await shiftService.updateShift(id, shiftData, user.token);
            dispatch({type: 'UPDATE_SHIFT', payload: shift});
            return true;
        } catch (error) {
            dispatch({type: 'SHIFT_ERROR', payload: error.response.data.message});
            return false;
        }
    };

    // Delete a shift
    const deleteShift = async (id) => {
        try {
            dispatch({type: 'SHIFT_REQUEST'});
            await shiftService.deleteShift(id, user.token);
            dispatch({type: 'DELETE_SHIFT', payload: id});
            return true;
        } catch (error) {
            dispatch({type: 'SHIFT_ERROR', payload: error.response.data.message});
            return false;
        }
    };

    // Reset success state
    const resetSuccess = () => {
        dispatch({type: 'RESET_SUCCESS'});
    };

    return (
        <ShiftContext.Provider
            value={{
                ...state,
                getShifts,
                getShift,
                createShift,
                updateShift,
                deleteShift,
                resetSuccess
            }}
        >
            {children}
        </ShiftContext.Provider>
    );
};

// Hook to use the shift context
export const useShiftContext = () => {
    return useContext(ShiftContext);
};