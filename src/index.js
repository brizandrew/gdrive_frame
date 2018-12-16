import path from 'path';
import GAPI from './gapi';

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const client = new GAPI();
client.downloadImages('downloads');
