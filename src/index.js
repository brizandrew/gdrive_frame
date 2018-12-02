import GAPI from './gapi';

require('dotenv').config();

const client = new GAPI();
client.downloadImages();
