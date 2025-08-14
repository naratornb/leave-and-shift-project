# Leave and Shift Management System

A comprehensive web application for managing staff shifts, leave requests, and employee information. This system allows managers and administrators to efficiently create shifts, assign employees, manage leave requests, and maintain employee profiles with role-based access control.


## Features
- **Shift Management**: Create, edit, and delete shifts with details such as date, time, location, and required staff count
- **Employee Management**: Add, update, and deactivate employee profiles with role-based access control
- **Leave Request & Approval**: Employees can submit leave requests, and managers can approve or reject them
- **Authentication & Authorization**: Role-based access control for Employees, Managers, and Administrators
- **Dashboard**: Role-specific dashboard with relevant information and quick actions

## Project Setup Instructions [EC2]
- start EC2 instance
- - instance id: 
- - instance ip:
- rerun build pipline
- access with given public ip address (using qut local network)
## Project Setup Instructions [Local]
### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Backend Setup
### 1. Clone the repository

```
git clone https://github.com/naratornb/leave-and-shift-project.git

cd leave-and-shift-project/backend 
```

### 2. Install dependencies:
```
npm install
```

### 3. Setup environment variables
```
MONGO_URI=mongodb+srv://local:mongo1234@cluster0.r0cf3te.mongodb.net/lsm_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```

## Frontend Setup
### 1. Navigate to the frontend directory:
```
cd ../frontend
```

## 2. Install dependencies:
```
npm install
```
## 3. Start the server:
```
npm start
```
The frontend will run on http://localhost:3000

## Running Tests
To run the backend tests:
```
cd backend
npm test
```

## Public URL
The project is currently under development and not deployed. For local access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Login Credentials
For testing purposes, you can use the following credentials:
### Admin User
- Email: admin@test.com
- Password: password123
### Manager User
- Email: manager@test.com
- Password: password123
### Employee User
- Email: employee@test.com
- Password: password123

## Technology Stack
**Frontend**: React, React Router, Axios, Tailwind CSS 

**Backend**: Node.js, Express, MongoDB, Mongoose, JWT

**Testing**: Mocha, Chai

## Project Structure
```
leave-and-shift-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints
### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
### Shifts (Manager/Admin only)
- `GET /api/shifts` - Get all shifts
- `GET /api/shifts/:id` - Get a specific shift
- `POST /api/shifts` - Create a new shift
- `PUT /api/shifts/:id `- Update a shift
- `DELETE /api/shifts/:id` - Delete a shift
### Employees (Manager/Admin only)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get a specific employee
- `POST /api/employees` - Create a new employee (Admin only)
- `PUT /api/employees/:id` - Update an employee
- `DELETE /api/employees/:id` - Delete an employee (Admin only)
- `PUT /api/employees/:id/deactivate` - Deactivate an employee
- `PUT /api/employees/:id/activate` - Activate an employee

## Contact
For any queries, please contact the development team at [**f.luke.benj@gmail.com**].