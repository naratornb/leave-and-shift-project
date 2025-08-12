import { createContext, useContext, useReducer, useEffect } from 'react';
import employeeService from '../pages/Employees';
import { useAuth } from './AuthContext';

// Initial state
const initialState = {
  employees: [],
  employee: null,
  isLoading: false,
  error: null,
  success: false
};

// Create context
export const EmployeeContext = createContext(initialState);

// Reducer
const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'EMPLOYEE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'GET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
        isLoading: false
      };
    case 'GET_EMPLOYEE':
      return {
        ...state,
        employee: action.payload,
        isLoading: false
      };
    case 'CREATE_EMPLOYEE':
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        isLoading: false,
        success: true
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        ),
        isLoading: false,
        success: true
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(employee => employee._id !== action.payload),
        isLoading: false,
        success: true
      };
    case 'TOGGLE_EMPLOYEE_STATUS':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        ),
        isLoading: false,
        success: true
      };
    case 'EMPLOYEE_ERROR':
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
export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  const { user } = useAuth();

  // Get all employees
  const getEmployees = async () => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const employees = await employeeService.getEmployees(user.token);
      dispatch({ type: 'GET_EMPLOYEES', payload: employees });
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
    }
  };

  // Get single employee
  const getEmployee = async (id) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const employee = await employeeService.getEmployee(id, user.token);
      dispatch({ type: 'GET_EMPLOYEE', payload: employee });
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
    }
  };

  // Create an employee
  const createEmployee = async (employeeData) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const employee = await employeeService.createEmployee(employeeData, user.token);
      dispatch({ type: 'CREATE_EMPLOYEE', payload: employee });
      return true;
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
      return false;
    }
  };

  // Update an employee
  const updateEmployee = async (id, employeeData) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const employee = await employeeService.updateEmployee(id, employeeData, user.token);
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
      return true;
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
      return false;
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      await employeeService.deleteEmployee(id, user.token);
      dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
      return true;
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
      return false;
    }
  };

  // Deactivate an employee
  const deactivateEmployee = async (id) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const response = await employeeService.deactivateEmployee(id, user.token);

      // Get updated employee data
      const updatedEmployee = await employeeService.getEmployee(id, user.token);
      dispatch({ type: 'TOGGLE_EMPLOYEE_STATUS', payload: updatedEmployee });
      return true;
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
      return false;
    }
  };

  // Activate an employee
  const activateEmployee = async (id) => {
    try {
      dispatch({ type: 'EMPLOYEE_REQUEST' });
      const response = await employeeService.activateEmployee(id, user.token);

      // Get updated employee data
      const updatedEmployee = await employeeService.getEmployee(id, user.token);
      dispatch({ type: 'TOGGLE_EMPLOYEE_STATUS', payload: updatedEmployee });
      return true;
    } catch (error) {
      dispatch({ type: 'EMPLOYEE_ERROR', payload: error.response.data.message });
      return false;
    }
  };

  // Reset success state
  const resetSuccess = () => {
    dispatch({ type: 'RESET_SUCCESS' });
  };

  return (
    <EmployeeContext.Provider
      value={{
        ...state,
        getEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        deactivateEmployee,
        activateEmployee,
        resetSuccess
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Hook to use the employee context
export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};