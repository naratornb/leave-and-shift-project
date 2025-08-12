// tests/employees.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Your Express app
const User = require('../models/User');

const { expect } = chai;
chai.use(chaiHttp);

describe('Employees API', () => {
  let token;
  let testEmployee;
  let userId;

  before(async () => {
    // Load environment variables for testing
    require('dotenv').config({path: '.env.test'});

    // Connect to test database
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Create a test user with admin role
    const user = new User({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
      position: 'System Administrator',
      contact: {
        phone: '123-456-7890',
        address: '123 Admin St'
      }
    });
    await user.save();
    userId = user._id;

    // Login to get token
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    token = res.body.token;

    // Create a test employee
    const employee = new User({
      name: 'Test Employee',
      email: 'employee@test.com',
      password: 'password123',
      role: 'employee',
      position: 'Developer',
      contact: {
        phone: '987-654-3210',
        address: '456 Employee St'
      }
    });
    await employee.save();
    testEmployee = employee;
  });

  after(async () => {
    // Clean up test data
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/employees', () => {
    it('should get all employees', async () => {
      const res = await chai.request(app)
        .get('/api/employees')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('email');
      expect(res.body[0]).to.have.property('role');
      expect(res.body[0]).to.have.property('position');
    });
  });

  describe('GET /api/employees/:id', () => {
    it('should get a single employee by id', async () => {
      const res = await chai.request(app)
        .get(`/api/employees/${testEmployee._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').equal(testEmployee._id.toString());
      expect(res.body).to.have.property('name', 'Test Employee');
      expect(res.body).to.have.property('email', 'employee@test.com');
      expect(res.body).to.have.property('role', 'employee');
      expect(res.body).to.have.property('position', 'Developer');
    });
  });

  describe('POST /api/employees', () => {
    it('should create a new employee', async () => {
      const newEmployee = {
        name: 'New Employee',
        email: 'newemployee@test.com',
        password: 'password123',
        role: 'employee',
        position: 'Designer',
        contact: {
          phone: '555-123-4567',
          address: '789 New St'
        }
      };

      const res = await chai.request(app)
        .post('/api/employees')
        .set('Authorization', `Bearer ${token}`)
        .send(newEmployee);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', 'New Employee');
      expect(res.body).to.have.property('email', 'newemployee@test.com');
      expect(res.body).to.have.property('role', 'employee');
      expect(res.body).to.have.property('position', 'Designer');
      expect(res.body).to.have.property('contact');
      expect(res.body.contact).to.have.property('phone', '555-123-4567');
    });
  });

});