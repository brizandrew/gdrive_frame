"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _randomHash = require("random-hash");

var _randomHash2 = _interopRequireDefault(_randomHash);

var _googleAuthLibrary = require("google-auth-library");

var _googleapis = require("googleapis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GAPI {
  constructor() {
    this.drive = _googleapis.google.drive('v3');
    this.client = new _googleAuthLibrary.JWT({
      email: process.env.GAPI_CLIENT_EMAIL,
      key: `${process.env.GAPI_PRIVATE_KEY}`.replace(/\\n/g, '\n'),
      // dotenv escapes "\n" characters which should be rendered,
      scopes: ['https://www.googleapis.com/auth/drive']
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
        spaces: 'drive'
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
    const filename = name || `${(0, _randomHash2.default)()}.jpg`;

    const file = _fs2.default.createWriteStream(_path2.default.join(directory, filename));

    const progress = 0;
    const res = await this.drive.files.get({
      auth: this.client,
      fileId,
      alt: 'media'
    }, {
      responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
      res.data.on('end', () => {
        resolve(filename);
      }).on('error', err => {
        reject(err);
      }).pipe(file);
    });
  }

  async downloadImages(directory = 'downloads') {
    return this.files("mimeType='image/jpeg' or mimeType='image/png'").then(files => Promise.all(files.map(f => this.download(f.id, f.name, directory)))).catch(err => {
      console.log(err);
    });
  }

}

exports.default = GAPI;