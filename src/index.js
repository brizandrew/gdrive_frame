import path from 'path';
import GAPI from './gapi';

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const run = (downloads) => {
  const client = new GAPI();
  return client.downloadImages(downloads);
};

export default run;

if (require.main === module) {
  run('downloads');
}
