import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import { useAuth } from '../context/AuthContext';

const EmployeeForm = () => {
  const { createEmployee, updateEmployee, getEmployee, employee, isLoading, error, success, resetSuccess } = useEmployeeContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const isAdmin = user.role === 'admin';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    position: '',
    contact: {
      phone: '',
      address: ''
    }
  });

  const { name, email, password, role, position, contact } = formData;

  useEffect(() => {
    if (isEdit) {
      getEmployee(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (isEdit && employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        password: '',
        role: employee.role,
        position: employee.position,
        contact: {
          phone: employee.contact?.phone || '',
          address: employee.contact?.address || ''
        }
      });
    }
  }, [employee, isEdit]);

  useEffect(() => {
    if (success) {
      resetSuccess();
      navigate('/employees');
    }
    // eslint-disable-next-line
  }, [success]);

  const onChange = (e) => {
    if (e.target.name.includes('contact.')) {
      const field = e.target.name.split('.')[1];
      setFormData({
        ...formData,
        contact: {
          ...contact,
          [field]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateEmployee(id, formData);
    } else {
      createEmployee(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={isEdit}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password {isEdit && <span className="text-gray-500 text-xs">(Leave blank to keep current password)</span>}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required={!isEdit}
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {isAdmin && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                {isEdit && <option value="admin">Admin</option>}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="contact.phone"
              name="contact.phone"
              value={contact.phone}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact.address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="contact.address"
              name="contact.address"
              value={contact.address}
              onChange={onChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Saving...' : (isEdit ? 'Update Employee' : 'Add Employee')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;