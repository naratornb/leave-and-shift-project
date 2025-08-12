import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useShiftContext} from '../context/ShiftContext';

const ShiftForm = () => {
    const {createShift, updateShift, getShift, shift, isLoading, error, success, resetSuccess} = useShiftContext();
    const navigate = useNavigate();
    const {id} = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        requiredStaff: 1,
        location: ''
    });

    const {date, startTime, endTime, requiredStaff, location} = formData;

    useEffect(() => {
        if (isEdit) {
            getShift(id);
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        if (isEdit && shift) {
            setFormData({
                date: new Date(shift.date).toISOString().split('T')[0],
                startTime: shift.startTime,
                endTime: shift.endTime,
                requiredStaff: shift.requiredStaff,
                location: shift.location
            });
        }
    }, [shift, isEdit]);

    useEffect(() => {
        if (success) {
            resetSuccess();
            navigate('/shifts');
        }
        // eslint-disable-next-line
    }, [success]);

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            updateShift(id, formData);
        } else {
            createShift(formData);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
                {isEdit ? 'Edit Shift' : 'Create New Shift'}
            </h2>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={location}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={startTime}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                            End Time
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={endTime}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="requiredStaff" className="block text-sm font-medium text-gray-700">
                            Required Staff
                        </label>
                        <input
                            type="number"
                            id="requiredStaff"
                            name="requiredStaff"
                            value={requiredStaff}
                            onChange={onChange}
                            min="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/shifts')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading ? 'Saving...' : (isEdit ? 'Update Shift' : 'Create Shift')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShiftForm;