const mongoose = require('mongoose');
// use dotenv to get environment variables
require('dotenv').config({
  path: 'src/config/.env',
});

// const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

// const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// only host port and database name
const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
}

module.exports = connectDatabase;