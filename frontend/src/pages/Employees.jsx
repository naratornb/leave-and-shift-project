import axios from 'axios';

const API_URL = '/api/employees/';

// Create new employee
const createEmployee = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, employeeData, config);
  return response.data;
};

// Get all employees
const getEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single employee
const getEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL + employeeId, config);
  return response.data;
};

// Update employee
const updateEmployee = async (employeeId, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(API_URL + employeeId, employeeData, config);
  return response.data;
};

// Delete employee
const deleteEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(API_URL + employeeId, config);
  return response.data;
};

// Deactivate employee
const deactivateEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${API_URL}${employeeId}/deactivate`, {}, config);
  return response.data;
};

// Activate employee
const activateEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${API_URL}${employeeId}/activate`, {}, config);
  return response.data;
};

const employeeService = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  deactivateEmployee,
  activateEmployee
};

export default employeeService;