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