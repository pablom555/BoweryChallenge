const LOCAL_ENVIRONMENT = 'local';
const DEFAULT_PORT = 3000;
const LOCAL_MONGO_URI = 'mongodb://localhost:27017/bowery';

const PORT = process.env.HTTP_SERVER_PORT || DEFAULT_PORT;
const RUNTIME_ENVIRONMENT = process.env.ENVIRONMENT || LOCAL_ENVIRONMENT;
const MONGODB_URI = process.env.MONGODB_URI || LOCAL_MONGO_URI;

module.exports = { 
  PORT, 
  RUNTIME_ENVIRONMENT, 
  MONGODB_URI
};