const dotenv = require('dotenv');
dotenv.config();

const { JWT_SECRET, JWT_LIFETIME} = process.env;

module.exports = { JWT_SECRET, JWT_LIFETIME };
