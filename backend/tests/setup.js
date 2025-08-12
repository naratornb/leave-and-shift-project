const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

// Connect to test database before tests
before(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clean up database after tests
after(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});