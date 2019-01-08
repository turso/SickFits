require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to hadle cookies ( JWT )
// TODO Use express middleware to populate curren user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
