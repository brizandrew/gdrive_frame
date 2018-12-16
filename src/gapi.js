import fs from 'fs';
import path from 'path';
import generateHash from 'random-hash';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

class GAPI {
  constructor() {
    this.drive = google.drive('v3');

    this.client = new JWT({
      email: process.env.GAPI_CLIENT_EMAIL,
      key: (`${process.env.GAPI_PRIVATE_KEY}`).replace(/\\n/g, '\n'), // dotenv escapes "\n" characters which should be rendered,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
  }

  auth() {
    return this.client.authorize();
  }

  async files(query) {
    await this.auth();
    return new Promise((resolve, reject) => {
      this.drive.files.list({
        auth: this.client,
        q: query,
        spaces: 'drive',
      }, (err, resp) => {
        if (err) {
          reject(err);
        }
        resolve(resp.data.files);
      });
    });
  }

  async download(fileId, name, directory = 'downloads') {
    await this.auth();
    const filename = name || `${generateHash()}.jpg`;
    const file = fs.createWriteStream(path.join(directory, filename));

    const progress = 0;
    const res = await this.drive.files.get(
      {
        auth: this.client,
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' },
    );

    return new Promise((resolve, reject) => {
      res.data
        .on('end', () => {
          resolve(filename);
        })
        .on('error', (err) => {
          reject(err);
        })
        .pipe(file);
    });
  }

  async downloadImages(directory = 'downloads') {
    return this.files("mimeType='image/jpeg' or mimeType='image/png'")
      .then(files => Promise.all(
        files.map(f => this.download(f.id, f.name, directory)),
      ))
      .catch((err) => { console.log(err); });
  }
}

export default GAPI;


