"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _gapi = require("./gapi");

var _gapi2 = _interopRequireDefault(_gapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({
  path: _path2.default.join(__dirname, '../.env')
});

const run = downloads => {
  const client = new _gapi2.default();
  return client.downloadImages(downloads);
};

exports.default = run;

if (require.main === module) {
  run('downloads');
}