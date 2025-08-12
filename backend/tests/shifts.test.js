const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Your Express app
const User = require('../models/User');
const Shift = require('../models/Shift');

const {expect} = chai;
chai.use(chaiHttp);

describe('Shifts API', () => {
  let token;
  let testShift;
  let userId;

  // Connect to test database before running tests
  before(async () => {
    // Load environment variables for testing
    require('dotenv').config({path: '.env.test'});

    // Connect to the test database
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Create a test user with manager role
    const user = new User({
      name: 'Test Manager',
      email: 'manager@test.com',
      password: 'password123',
      role: 'admin'
    });
    await user.save();
    userId = user._id;

    // Login to get token
    const res = await chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'manager@test.com',
        password: 'password123'
      });

    token = res.body.token;

    // Create a test shift
    const shift = new Shift({
      date: '2023-11-15',
      startTime: '09:00',
      endTime: '17:00',
      requiredStaff: 3,
      location: 'Main Office',
      createdBy: userId
    });
    await shift.save();
    testShift = shift;
  });

  // After all tests, clean up
  after(async () => {
    // Clean up test data
    await User.deleteMany({});
    await Shift.deleteMany({});
    await mongoose.connection.close();
  });


  describe('GET /api/shifts', () => {
    it('should get all shifts', async () => {
      const res = await chai.request(app)
        .get('/api/shifts')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[0]).to.have.property('date');
      expect(res.body[0]).to.have.property('startTime');
      expect(res.body[0]).to.have.property('endTime');
    });
  });

  describe('GET /api/shifts/:id', () => {
    it('should get a single shift by id', async () => {
      const res = await chai.request(app)
        .get(`/api/shifts/${testShift._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').equal(testShift._id.toString());
      expect(res.body).to.have.property('date', '2023-11-15T00:00:00.000Z');
      expect(res.body).to.have.property('startTime', '09:00');
      expect(res.body).to.have.property('endTime', '17:00');
    });
  });

  describe('POST /api/shifts', () => {
    it('should create a new shift', async () => {
      const newShift = {
        date: '2023-11-20',
        startTime: '10:00',
        endTime: '18:00',
        requiredStaff: 2,
        location: 'Branch Office'
      };

      const res = await chai.request(app)
        .post('/api/shifts')
        .set('Authorization', `Bearer ${token}`)
        .send(newShift);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('date', '2023-11-20T00:00:00.000Z');
      expect(res.body).to.have.property('startTime', '10:00');
      expect(res.body).to.have.property('endTime', '18:00');
      expect(res.body).to.have.property('requiredStaff', 2);
      expect(res.body).to.have.property('location', 'Branch Office');
    });
  });

  describe('PUT /api/shifts/:id', () => {
    it('should update a shift', async () => {
      const updatedShift = {
        date: '2023-11-16',
        startTime: '08:00',
        endTime: '16:00',
        requiredStaff: 4,
        location: 'Updated Office'
      };

      const res = await chai.request(app)
        .put(`/api/shifts/${testShift._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedShift);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').equal(testShift._id.toString());
      expect(res.body).to.have.property('date', '2023-11-16T00:00:00.000Z');
      expect(res.body).to.have.property('startTime', '08:00');
      expect(res.body).to.have.property('endTime', '16:00');
      expect(res.body).to.have.property('requiredStaff', 4);
      expect(res.body).to.have.property('location', 'Updated Office');
    });
  });

  describe('DELETE /api/shifts/:id', () => {
    it('should delete a shift', async () => {
      // Create a new shift to delete
      const shiftToDelete = new Shift({
        date: '2023-11-25',
        startTime: '09:00',
        endTime: '17:00',
        requiredStaff: 1,
        location: 'To Be Deleted',
        createdBy: userId
      });
      await shiftToDelete.save();

      const res = await chai.request(app)
        .delete(`/api/shifts/${shiftToDelete._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Shift removed');

      // Verify shift is deleted
      const deletedShift = await Shift.findById(shiftToDelete._id);
      expect(deletedShift).to.be.null;
    });
  });
});