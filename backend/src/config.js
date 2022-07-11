const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.HOST_URL || 'https://api.flickr.com/services/';
const FORMAT = process.env.FORMAT || 'format=json';
const PORT = process.env.PORT || '8080';

module.exports = { URL, FORMAT, PORT };
