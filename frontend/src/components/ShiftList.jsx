import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useShiftContext} from '../context/ShiftContext';
import {useAuth} from '../context/AuthContext';
import {format} from 'date-fns';

const ShiftList = () => {
    const {shifts, isLoading, error, getShifts, deleteShift} = useShiftContext();
    const {user} = useAuth();

    useEffect(() => {
        getShifts();
        // eslint-disable-next-line
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this shift?')) {
            deleteShift(id);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading shifts...</div>;
    }

    if (error) {
        return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Shift Management</h2>
                {(user.role === 'manager' || user.role === 'admin') && (
                    <Link
                        to="/shifts/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Create New Shift
                    </Link>
                )}
            </div>

            {shifts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No shifts found. Create your first shift.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Required Staff
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {shifts.map((shift) => (
                            <tr key={shift._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {format(new Date(shift.date), 'MMM dd, yyyy')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {shift.startTime} - {shift.endTime}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {shift.requiredStaff}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {shift.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {(user.role === 'manager' || user.role === 'admin') && (
                                        <>
                                            <Link
                                                to={`/shifts/${shift._id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(shift._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShiftList;